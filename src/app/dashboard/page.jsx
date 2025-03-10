'use client';
import { useState, useEffect } from 'react';
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
  arrayUnion,
  updateDoc
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import '@/firebase';

export default function Dashboard() {
  const [isFarmer, setIsFarmer] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customProduce, setCustomProduce] = useState('');
  const [listings, setListings] = useState([]);
  const [userGeoLocation, setUserGeoLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [produces, setProduces] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  
  // User information
  const [userName, setUserName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [location, setLocation] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [activeProduct, setActiveProduct] = useState('');

  const db = getFirestore();
  const auth = getAuth();

  // Get user's authentication and load user info
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        fetchUserInfo(user.email);
        fetchUserProducts(user.uid);
      } else {
        console.log('User is not logged in');
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
            lng: position.coords.longitude
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
    if (activeProduct && userInfoLoaded) {
      fetchListings();
    }
  }, [isFarmer, activeProduct, userGeoLocation, userInfoLoaded]);

  // Fetch user info from UserInfo table
  const fetchUserInfo = async (email) => {
    try {
      const userInfoRef = collection(db, 'UserInfo');
      const q = query(userInfoRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserName(userData.name || '');
        setContactNumber(userData.contactNumber || '');
        setUserInfoLoaded(true);
      } else {
        console.log('User not found in UserInfo table');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // Fetch user's products from appropriate collection
  const fetchUserProducts = async (userId) => {
    try {
      // Check in both collections
      const farmerRef = doc(db, 'farmersinfo', userId);
      const businessRef = doc(db, 'businessinfo', userId);
      
      const farmerDoc = await getDoc(farmerRef);
      const businessDoc = await getDoc(businessRef);
      
      const farmerProducts = farmerDoc.exists() && farmerDoc.data().products ? farmerDoc.data().products : [];
      const businessProducts = businessDoc.exists() && businessDoc.data().products ? businessDoc.data().products : [];
      
      // Combine all user products
      const allUserProducts = [...new Set([...farmerProducts, ...businessProducts])];
      setUserProducts(allUserProducts);
    } catch (error) {
      console.error('Error fetching user products:', error);
    }
  };

  // Fetch products from Firebase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      
      if (!snapshot.empty) {
        const productsData = snapshot.docs.map(doc => doc.data().name);
        setProduces(productsData);
      } else {
        console.log('No products found in Firebase');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (coords1, coords2) => {
    if (!coords1 || !coords2) return Infinity;
    
    const R = 6371; // Earth's radius in km
    const dLat = (coords2.lat - coords1.lat) * Math.PI / 180;
    const dLng = (coords2.lng - coords1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coords1.lat * Math.PI / 180) * Math.cos(coords2.lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const fetchListings = async () => {
    if (!activeProduct) return;
    
    setLoading(true);
    try {
      // Determine which collection to query based on user type
      const collectionName = isFarmer ? 'businessinfo' : 'farmersinfo';
      const q = query(collection(db, collectionName), where('products', 'array-contains', activeProduct));
      const querySnapshot = await getDocs(q);
      
      // Process Firestore data
      const data = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        // Convert GeoPoint to regular coordinates object if needed
        let coordinates = docData.coordinates;
        if (coordinates && coordinates.latitude) {
          coordinates = {
            lat: coordinates.latitude,
            lng: coordinates.longitude
          };
        }
        
        return {
          id: doc.id,
          ...docData,
          coordinates
        };
      });
      
      // Sort by distance if user location is available
      if (userGeoLocation && data.length > 0) {
        const dataWithDistance = data.map(item => ({
          ...item,
          distance: calculateDistance(userGeoLocation, item.coordinates)
        }));
        
        // Sort by distance (nearest first)
        dataWithDistance.sort((a, b) => a.distance - b.distance);
        setListings(dataWithDistance);
      } else {
        setListings(data);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (e) => {
    const value = e.target.value;
    if (value === '') return;
    
    if (value === 'other') {
      // Do nothing here, the custom input field will handle this
    } else if (!selectedProducts.includes(value)) {
      setSelectedProducts([...selectedProducts, value]);
    }
  };

  const handleAddCustomProduct = () => {
    if (!customProduce.trim()) return;
    
    // Check if product already exists in the main products list
    if (produces.some(p => p.toLowerCase() === customProduce.trim().toLowerCase())) {
      alert('This product already exists in the list. Please select it from the dropdown.');
      return;
    }
    
    // Add to selected products
    if (!selectedProducts.includes(customProduce.trim())) {
      setSelectedProducts([...selectedProducts, customProduce.trim()]);
      setCustomProduce('');
    }
  };

  const removeProduct = (product) => {
    setSelectedProducts(selectedProducts.filter(p => p !== product));
  };

  const handleViewListings = (product) => {
    setActiveProduct(product);
  };

  const handleSubmit = async () => {
    if (!location.trim()) {
      alert('Please enter your location');
      return;
    }

    if (selectedProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }

    try {
      // Add any new custom products to the products collection
      const customProducts = selectedProducts.filter(p => !produces.includes(p));
      
      for (const newProduce of customProducts) {
        await addDoc(collection(db, 'products'), { name: newProduce.trim() });
      }
      
      if (customProducts.length > 0) {
        // Refresh products list after adding new ones
        fetchProducts();
      }
      
      // Add or update the current user's information to the appropriate collection
      if (auth.currentUser) {
        const userCollection = isFarmer ? 'farmersinfo' : 'businessinfo';
        const userRef = doc(collection(db, userCollection), auth.currentUser.uid);
        
        const userData = {
          name: userName,
          contactNumber: contactNumber,
          email: userEmail,
          location: location.trim(),
          products: selectedProducts,
          userId: auth.currentUser.uid,
          coordinates: userGeoLocation ? new GeoPoint(userGeoLocation.lat, userGeoLocation.lng) : null,
          timestamp: new Date()
        };
        
        await setDoc(userRef, userData);

        // Update user products in state
        setUserProducts([...new Set([...userProducts, ...selectedProducts])]);
        
        // Set active product to first selected product to show listings
        if (selectedProducts.length > 0 && !activeProduct) {
          setActiveProduct(selectedProducts[0]);
        }
        
        alert(`Your ${isFarmer ? 'selling' : 'buying'} information has been updated!`);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black">
      <h1 className="text-2xl font-bold text-center mb-6">Agricultural Marketplace</h1>
      
      {/* Toggle Button */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-200 rounded-full p-1 flex w-64">
          <button 
            onClick={() => setIsFarmer(true)} 
            className={`flex-1 py-2 rounded-full transition-all duration-300 ${
              isFarmer ? 'bg-green-600 text-white shadow-md' : 'text-gray-700'
            }`}
          >
            Farmer
          </button>
          <button 
            onClick={() => setIsFarmer(false)} 
            className={`flex-1 py-2 rounded-full transition-all duration-300 ${
              !isFarmer ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700'
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
              <p className="text-gray-700"><strong>Name:</strong> {userName}</p>
              <p className="text-gray-700"><strong>Contact:</strong> {contactNumber}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Email:</strong> {userEmail}</p>
              {userProducts.length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-700"><strong>Your Products:</strong></p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {userProducts.map((product, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm cursor-pointer hover:bg-green-200"
                        onClick={() => handleViewListings(product)}
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
      </div>

      {/* Selection Panel */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {isFarmer ? 'What do you want to sell?' : 'What do you want to buy?'}
        </h2>
        
        <div className="mb-4">
          {loading && produces.length === 0 ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <select 
                value=""
                onChange={handleProductChange} 
                className="flex-1 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Add a product</option>
                {produces.map((produce, index) => (
                  <option key={index} value={produce}>{produce}</option>
                ))}
                <option value="other">Other (Specify)</option>
              </select>
            </div>
          )}
          
          {/* Custom produce input */}
          <div className="flex space-x-2 mt-3">
            <input 
              type="text" 
              placeholder="Enter a new product name" 
              value={customProduce}
              onChange={(e) => setCustomProduce(e.target.value)} 
              className="flex-1 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
            <button 
              onClick={handleAddCustomProduct}
              disabled={!customProduce.trim()}
              className={`px-4 py-3 rounded-lg font-medium ${
                !customProduce.trim() 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Add
            </button>
          </div>
          
          {/* Selected products display */}
          {selectedProducts.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Selected Products:</p>
              <div className="flex flex-wrap gap-2">
                {selectedProducts.map((product, idx) => (
                  <div 
                    key={idx} 
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center"
                  >
                    {product}
                    <button 
                      onClick={() => removeProduct(product)}
                      className="ml-2 text-green-800 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
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
          disabled={selectedProducts.length === 0 || !location.trim()}
          className={`w-full py-3 rounded-lg mt-4 font-medium transition-colors ${
            (selectedProducts.length === 0 || !location.trim()) 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Submit {isFarmer ? 'Selling' : 'Buying'} Information
        </button>
      </div>

      {/* Results Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">
          {activeProduct ? 
            `Available ${isFarmer ? 'Businesses' : 'Farmers'} for ${activeProduct}` : 
            `Select a product to see available ${isFarmer ? 'businesses' : 'farmers'}`
          }
        </h3>
        
        {userProducts.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">View listings for:</p>
            <div className="flex flex-wrap gap-2">
              {userProducts.map((product, idx) => (
                <button
                  key={idx}
                  onClick={() => handleViewListings(product)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeProduct === product
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {product}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {loading && activeProduct ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((item, index) => (
              <div key={index} className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  {item.distance && (
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                      {item.distance.toFixed(1)} km
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-1"><strong>Location:</strong> {item.location}</p>
                <p className="text-gray-600"><strong>Contact:</strong> {item.contactNumber}</p>
                <div className="mt-2">
                  <p className="font-medium text-gray-700">
                    {isFarmer ? 'Wants to Buy:' : 'Offers:'}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.products && item.products.map((product, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="mt-3 w-full py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                  Contact
                </button>
              </div>
            ))}
          </div>
        ) : activeProduct ? (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
            <p className="text-yellow-700">No listings found for {activeProduct}.</p>
            <p className="text-sm text-yellow-600 mt-1">Try selecting a different product or check back later.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}