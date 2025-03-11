"use client";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  GeoPoint,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut  } from "firebase/auth";
import "@/firebase";

export default function Dashboard() {
  const [isFarmer, setIsFarmer] = useState(true);
  const [selectedProduce, setSelectedProduce] = useState("");
  const [customProduce, setCustomProduce] = useState("");
  const [listings, setListings] = useState([]);
  const [userGeoLocation, setUserGeoLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [produces, setProduces] = useState([]);
  const [userListings, setUserListings] = useState([]);
  const [viewingProduce, setViewingProduce] = useState("");

  // User information
  const [userName, setUserName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [location, setLocation] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);

  const db = getFirestore();
  const auth = getAuth();

  // Get user's authentication and load user info
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        fetchUserInfo(user.email);
        fetchUserListings(user.uid);
      } else {
        console.log("User is not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  // Get user's location and load products on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserGeoLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to center of India if location access is denied
          setUserGeoLocation({ lat: 20.5937, lng: 78.9629 });
        }
      );
    }

    // Load products from Firebase
    fetchProducts();
  }, []);

  // Fetch listings when user toggles between farmer/businessman or selects a product
  useEffect(() => {
    if (viewingProduce && userInfoLoaded) {
      fetchListings();
    }
  }, [isFarmer, viewingProduce, userGeoLocation, userInfoLoaded]);

  // Fetch user info from UserInfo table
  const fetchUserInfo = async (email) => {
    try {
      const userInfoRef = collection(db, "UserInfo");
      const q = query(userInfoRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserName(userData.name || "");
        setContactNumber(userData.contactNumber || "");
        setUserInfoLoaded(true);
      } else {
        console.log("User not found in UserInfo table");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Fetch user's listings from appropriate collections
  const fetchUserListings = async (userId) => {
    try {
      // Fetch from both collections to show all user listings
      const farmerListingsQuery = query(
        collection(db, "farmersinfo"),
        where("userId", "==", userId)
      );

      const businessListingsQuery = query(
        collection(db, "businessinfo"),
        where("userId", "==", userId)
      );

      const [farmerSnapshot, businessSnapshot] = await Promise.all([
        getDocs(farmerListingsQuery),
        getDocs(businessListingsQuery),
      ]);

      const farmerListings = farmerSnapshot.docs.map((doc) => ({
        id: doc.id,
        type: "farmer",
        ...doc.data(),
      }));

      const businessListings = businessSnapshot.docs.map((doc) => ({
        id: doc.id,
        type: "business",
        ...doc.data(),
      }));

      const allListings = [...farmerListings, ...businessListings];
      setUserListings(allListings);

      // Set the viewing produce if there are listings and none is currently selected
      if (allListings.length > 0 && !viewingProduce) {
        setViewingProduce(allListings[0].product);
      }
    } catch (error) {
      console.error("Error fetching user listings:", error);
    }
  };

  // Fetch products from Firebase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(productsRef);

      if (!snapshot.empty) {
        const productsData = snapshot.docs.map((doc) => doc.data().name);
        setProduces(productsData);
      } else {
        console.log("No products found in Firebase");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (coords1, coords2) => {
    if (!coords1 || !coords2) return Infinity;

    const R = 6371; // Earth's radius in km
    const dLat = ((coords2.lat - coords1.lat) * Math.PI) / 180;
    const dLng = ((coords2.lng - coords1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((coords1.lat * Math.PI) / 180) *
        Math.cos((coords2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchListings = async () => {
    if (!viewingProduce) return;

    setLoading(true);
    try {
      // Determine which collection to query based on user type
      const collectionName = isFarmer ? "businessinfo" : "farmersinfo";
      const q = query(
        collection(db, collectionName),
        where("product", "==", viewingProduce)
      );
      const querySnapshot = await getDocs(q);

      // Process Firestore data
      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        // Convert GeoPoint to regular coordinates object if needed
        let coordinates = docData.coordinates;
        if (coordinates && coordinates.latitude) {
          coordinates = {
            lat: coordinates.latitude,
            lng: coordinates.longitude,
          };
        }

        return {
          id: doc.id,
          ...docData,
          coordinates,
        };
      });

      // Sort by distance if user location is available
      if (userGeoLocation && data.length > 0) {
        const dataWithDistance = data.map((item) => ({
          ...item,
          distance: calculateDistance(userGeoLocation, item.coordinates),
        }));

        // Sort by distance (nearest first)
        dataWithDistance.sort((a, b) => a.distance - b.distance);
        setListings(dataWithDistance);
      } else {
        setListings(data);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!location.trim()) {
      alert("Please enter your location");
      return;
    }

    if (!selectedProduce) {
      alert("Please select a product");
      return;
    }

    try {
      if (selectedProduce === "other" && customProduce.trim()) {
        // Check if custom produce already exists in the list
        const lowerCaseCustom = customProduce.trim().toLowerCase();
        const productExists = produces.some(
          (p) => p.toLowerCase() === lowerCaseCustom
        );

        if (productExists) {
          alert(
            "This product already exists in the list. Please select it from the dropdown instead."
          );
          return;
        }

        // Add new produce to products collection
        const docRef = await addDoc(collection(db, "products"), {
          name: customProduce.trim(),
        });
        console.log("New produce added with ID:", docRef.id);

        // Update selected produce to the custom one
        setSelectedProduce(customProduce.trim());

        // Refresh products list
        fetchProducts();
      }

      // Generate a unique ID for this listing
      const listingId = auth.currentUser.uid + "_" + Date.now();

      // Add the current user's information to the appropriate collection
      if (auth.currentUser) {
        const userCollection = isFarmer ? "farmersinfo" : "businessinfo";
        const userRef = doc(collection(db, userCollection), listingId);

        const finalProduct =
          selectedProduce === "other" ? customProduce.trim() : selectedProduce;

        await setDoc(userRef, {
          name: userName,
          contactNumber: contactNumber,
          email: userEmail,
          location: location.trim(),
          product: finalProduct,
          userId: auth.currentUser.uid,
          coordinates: userGeoLocation
            ? new GeoPoint(userGeoLocation.lat, userGeoLocation.lng)
            : null,
          timestamp: new Date(),
        });

        // Clear form fields for next entry
        setSelectedProduce("");
        setCustomProduce("");

        // Fetch user listings after successful submission
        fetchUserListings(auth.currentUser.uid);

        // Set viewing produce to the new one
        setViewingProduce(finalProduct);

        // Show success message
        alert(
          `Your ${
            isFarmer ? "selling" : "buying"
          } listing for ${finalProduct} has been added! You can create more listings with different products.`
        );
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data. Please try again.");
    }
  };

  const deleteListing = async (listing) => {
    try {
      const collectionName =
        listing.type === "farmer" ? "farmersinfo" : "businessinfo";
      const listingRef = doc(db, collectionName, listing.id); // Reference the document to delete

      // Delete the document
      await deleteDoc(listingRef);

      // Refresh user listings
      fetchUserListings(auth.currentUser.uid);

      alert("Listing deleted successfully");
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Error deleting listing. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        fetchUserInfo(user.email);
        fetchUserListings(user.uid);
      } else {
        console.log('User is not logged in');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log('User logged out successfully');
      // Redirect to login page or update UI as needed
      window.location.href = '/login'; // Example: Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black">
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-secondary text-primary font-semibold py-2 px-3 rounded-xl"
        >
          Logout
        </button>
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">
        Agricultural Marketplace
      </h1>

      {/* Toggle Button */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-200 rounded-full p-1 flex w-64">
          <button
            onClick={() => setIsFarmer(true)}
            className={`flex-1 py-2 rounded-full transition-all duration-300 ${
              isFarmer ? "bg-green-600 text-white shadow-md" : "text-gray-700"
            }`}
          >
            Farmer
          </button>
          <button
            onClick={() => setIsFarmer(false)}
            className={`flex-1 py-2 rounded-full transition-all duration-300 ${
              !isFarmer ? "bg-blue-600 text-white shadow-md" : "text-gray-700"
            }`}
          >
            Businessman
          </button>
        </div>
      </div>

      {/* User Information Display */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Information</h2>

        {userInfoLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700">
                <strong>Name:</strong> {userName}
              </p>
              <p className="text-gray-700">
                <strong>Contact:</strong> {contactNumber}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {userEmail}
              </p>
            </div>

            {/* User's active listings */}
            <div>
              {userListings.length > 0 ? (
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    Your Active Listings ({userListings.length}):
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {userListings.map((listing, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                      >
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              listing.type === "farmer"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {listing.type === "farmer" ? "Selling" : "Buying"}
                          </span>
                          <span
                            className="ml-2 font-medium cursor-pointer hover:underline"
                            onClick={() => setViewingProduce(listing.product)}
                          >
                            {listing.product}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteListing(listing)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">No active listings</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
      </div>

      {/* Create Listing Panel */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Create New {isFarmer ? "Selling" : "Buying"} Listing
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Product (One per listing)
          </label>
          {loading && produces.length === 0 ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <select
              value={selectedProduce}
              onChange={(e) => setSelectedProduce(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a product</option>
              {produces.map((produce, index) => (
                <option key={index} value={produce}>
                  {produce}
                </option>
              ))}
              <option value="other">Other (Specify)</option>
            </select>
          )}
        </div>

        {selectedProduce === "other" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Product Name
            </label>
            <input
              type="text"
              placeholder="Enter new product name"
              value={customProduce}
              onChange={(e) => setCustomProduce(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Location
          </label>
          <input
            type="text"
            placeholder="Enter your location (city, state)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={
            !selectedProduce ||
            (selectedProduce === "other" && !customProduce.trim()) ||
            !location.trim()
          }
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            !selectedProduce ||
            (selectedProduce === "other" && !customProduce.trim()) ||
            !location.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Create {isFarmer ? "Selling" : "Buying"} Listing
        </button>

        <p className="text-sm text-gray-600 mt-2 text-center">
          After creating this listing, you can add additional listings with
          different products.
        </p>
      </div>

      {/* Browse Listings Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Browse Listings</h2>

        {/* Product selector for viewing */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            View Listings For:
          </label>
          <div className="flex flex-wrap gap-2">
            {userListings.length > 0 ? (
              // Show unique products from user listings
              [...new Set(userListings.map((listing) => listing.product))].map(
                (product, idx) => (
                  <button
                    key={idx}
                    onClick={() => setViewingProduce(product)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      viewingProduce === product
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {product}
                  </button>
                )
              )
            ) : (
              <p className="text-gray-500 italic">
                Create a listing to view matches
              </p>
            )}
          </div>
        </div>

        {/* Results display */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">
            {viewingProduce
              ? `Available ${
                  isFarmer ? "Businesses" : "Farmers"
                } for ${viewingProduce}`
              : `Select a product to see available ${
                  isFarmer ? "businesses" : "farmers"
                }`}
          </h3>

          {loading && viewingProduce ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    {item.distance && (
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                        {item.distance.toFixed(1)} km
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p className="text-gray-600">
                    <strong>Contact:</strong> {item.contactNumber}
                  </p>
                  <p className="mt-2 text-gray-700">
                    <span className="font-medium">
                      {isFarmer ? "Wants to Buy" : "Wants to Sell"}:
                    </span>
                    <span className="ml-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {item.product}
                    </span>
                  </p>
                  <button className="mt-3 w-full py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                    Contact
                  </button>
                </div>
              ))}
            </div>
          ) : viewingProduce ? (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
              <p className="text-yellow-700">
                No listings found for {viewingProduce}.
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                Try selecting a different product or check back later.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
