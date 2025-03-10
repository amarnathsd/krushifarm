'use client';
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, GeoPoint, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import '@/firebase';

// List of major agricultural produces in India
const agriProduces = [
  'Cotton', 'Wheat', 'Rice', 'Sugarcane', 'Maize', 
  'Barley', 'Mustard', 'Soybean', 'Groundnut', 'Jute', 
  'Pulses', 'Banana', 'Apple', 'Tomato', 'Onion', 
  'Mango', 'Potato', 'Garlic', 'Chili', 'Tea'
];

// Dummy farmer data with location coordinates for distance calculation
const dummyFarmers = [
  { name: 'Ramesh Singh', location: 'Pune', product: 'Wheat', coordinates: { lat: 18.5204, lng: 73.8567 } },
  { name: 'Suresh Kumar', location: 'Nagpur', product: 'Rice', coordinates: { lat: 21.1458, lng: 79.0882 } },
  { name: 'Amit Patel', location: 'Mumbai', product: 'Cotton', coordinates: { lat: 19.0760, lng: 72.8777 } },
  { name: 'Rajesh Verma', location: 'Delhi', product: 'Tomato', coordinates: { lat: 28.7041, lng: 77.1025 } },
  { name: 'Manoj Gupta', location: 'Bangalore', product: 'Onion', coordinates: { lat: 12.9716, lng: 77.5946 } },
  { name: 'Vijay Sharma', location: 'Chennai', product: 'Wheat', coordinates: { lat: 13.0827, lng: 80.2707 } },
  { name: 'Sanjay Yadav', location: 'Kolkata', product: 'Maize', coordinates: { lat: 22.5726, lng: 88.3639 } },
  { name: 'Prakash Joshi', location: 'Hyderabad', product: 'Sugarcane', coordinates: { lat: 17.3850, lng: 78.4867 } },
  { name: 'Dinesh Tiwari', location: 'Jaipur', product: 'Potato', coordinates: { lat: 26.9124, lng: 75.7873 } },
  { name: 'Rakesh Mishra', location: 'Ahmedabad', product: 'Groundnut', coordinates: { lat: 23.0225, lng: 72.5714 } },
  { name: 'Mukesh Agarwal', location: 'Lucknow', product: 'Mango', coordinates: { lat: 26.8467, lng: 80.9462 } },
  { name: 'Anand Kulkarni', location: 'Bhopal', product: 'Soybean', coordinates: { lat: 23.2599, lng: 77.4126 } },
  { name: 'Kiran Reddy', location: 'Chandigarh', product: 'Apple', coordinates: { lat: 30.7333, lng: 76.7794 } },
  { name: 'Ganesh Nair', location: 'Kochi', product: 'Banana', coordinates: { lat: 9.9312, lng: 76.2673 } },
  { name: 'Sunil Patil', location: 'Indore', product: 'Garlic', coordinates: { lat: 22.7196, lng: 75.8577 } }
];

// Dummy business data with location coordinates for distance calculation
const dummyBusinesses = [
  { name: 'AgroCorp Ltd.', location: 'Chennai', product: 'Wheat', coordinates: { lat: 13.0827, lng: 80.2707 } },
  { name: 'FreshMart Industries', location: 'Kolkata', product: 'Rice', coordinates: { lat: 22.5726, lng: 88.3639 } },
  { name: 'Cotton Traders Inc.', location: 'Hyderabad', product: 'Cotton', coordinates: { lat: 17.3850, lng: 78.4867 } },
  { name: 'Veggie Hub Exports', location: 'Ahmedabad', product: 'Tomato', coordinates: { lat: 23.0225, lng: 72.5714 } },
  { name: 'SpiceMart Global', location: 'Jaipur', product: 'Onion', coordinates: { lat: 26.9124, lng: 75.7873 } },
  { name: 'Hindustan Foods', location: 'Mumbai', product: 'Potato', coordinates: { lat: 19.0760, lng: 72.8777 } },
  { name: 'Bharat Agro Processors', location: 'Delhi', product: 'Maize', coordinates: { lat: 28.7041, lng: 77.1025 } },
  { name: 'Kisan Seva Corp', location: 'Bangalore', product: 'Sugarcane', coordinates: { lat: 12.9716, lng: 77.5946 } },
  { name: 'Indian Farmers Collective', location: 'Pune', product: 'Groundnut', coordinates: { lat: 18.5204, lng: 73.8567 } },
  { name: 'Fruit Express Ltd', location: 'Nagpur', product: 'Mango', coordinates: { lat: 21.1458, lng: 79.0882 } },
  { name: 'GrainMart Processing', location: 'Lucknow', product: 'Wheat', coordinates: { lat: 26.8467, lng: 80.9462 } },
  { name: 'Organic India Pvt Ltd', location: 'Bhopal', product: 'Soybean', coordinates: { lat: 23.2599, lng: 77.4126 } },
  { name: 'Himalayan Produce Co', location: 'Chandigarh', product: 'Apple', coordinates: { lat: 30.7333, lng: 76.7794 } },
  { name: 'South Indian Exports', location: 'Kochi', product: 'Banana', coordinates: { lat: 9.9312, lng: 76.2673 } },
  { name: 'Spice Traders United', location: 'Indore', product: 'Garlic', coordinates: { lat: 22.7196, lng: 75.8577 } }
];

export default function Dashboard() {
  const [isFarmer, setIsFarmer] = useState(true);
  const [selectedProduce, setSelectedProduce] = useState('');
  const [customProduce, setCustomProduce] = useState('');
  const [listings, setListings] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const auth = getAuth();

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to center of India if location access is denied
          setUserLocation({ lat: 20.5937, lng: 78.9629 });
        }
      );
    }
    
    // Initialize products in Firebase if they don't exist yet
    initializeProducts();
  }, []);

  // Fetch listings when user toggles between farmer/businessman or selects a product
  useEffect(() => {
    if (selectedProduce) {
      fetchListings();
    }
  }, [isFarmer, selectedProduce, userLocation]);

  // Initialize the products collection in Firebase with default agri produces
  const initializeProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      
      // Only add products if the collection is empty
      if (snapshot.empty) {
        for (const produce of agriProduces) {
          await addDoc(productsRef, { name: produce });
        }
        console.log('Products initialized in Firebase');
      }
    } catch (error) {
      console.error('Error initializing products:', error);
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
    if (!selectedProduce) return;
    
    setLoading(true);
    try {
      const collectionName = isFarmer ? 'businesses' : 'farmers';
      const q = query(collection(db, collectionName), where('product', '==', selectedProduce));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // If no data in Firebase, use dummy data filtered by selected produce
      let filteredData = data.length > 0 ? data : 
        (isFarmer ? 
          dummyBusinesses.filter(b => b.product === selectedProduce) : 
          dummyFarmers.filter(f => f.product === selectedProduce)
        );
      
      // Sort by distance if user location is available
      if (userLocation) {
        filteredData = filteredData.map(item => ({
          ...item,
          distance: calculateDistance(userLocation, item.coordinates)
        })).sort((a, b) => a.distance - b.distance);
      }
      
      setListings(filteredData);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (selectedProduce === 'other' && customProduce.trim()) {
        // Add new produce to products collection
        const docRef = await addDoc(collection(db, 'products'), { name: customProduce.trim() });
        console.log('New produce added with ID:', docRef.id);
        
        // Update selected produce to the custom one
        setSelectedProduce(customProduce.trim());
        setCustomProduce('');
      }
      
      // Also add the current user's information to the appropriate collection
      if (auth.currentUser) {
        const userCollection = isFarmer ? 'farmers' : 'businesses';
        const userRef = doc(collection(db, userCollection), auth.currentUser.uid);
        
        await setDoc(userRef, {
          name: auth.currentUser.displayName || 'Anonymous User',
          location: 'Unknown Location', // This would ideally come from a form
          product: selectedProduce === 'other' ? customProduce.trim() : selectedProduce,
          userId: auth.currentUser.uid,
          coordinates: userLocation ? new GeoPoint(userLocation.lat, userLocation.lng) : null,
          timestamp: new Date()
        });
      }
      
      fetchListings();
    } catch (error) {
      console.error('Error submitting data:', error);
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

      {/* Selection Panel */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {isFarmer ? 'What do you want to sell?' : 'What do you want to buy?'}
        </h2>
        
        <select 
          value={selectedProduce}
          onChange={(e) => setSelectedProduce(e.target.value)} 
          className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select a produce</option>
          {agriProduces.map((produce, index) => (
            <option key={index} value={produce}>{produce}</option>
          ))}
          <option value="other">Other (Specify)</option>
        </select>
        
        {selectedProduce === 'other' && (
          <div className="mt-3">
            <input 
              type="text" 
              placeholder="Enter new produce name" 
              value={customProduce}
              onChange={(e) => setCustomProduce(e.target.value)} 
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>
        )}
        
        <button 
          onClick={handleSubmit} 
          disabled={!selectedProduce || (selectedProduce === 'other' && !customProduce.trim())}
          className={`w-full py-3 rounded-lg mt-4 font-medium transition-colors ${
            (!selectedProduce || (selectedProduce === 'other' && !customProduce.trim())) 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Find {isFarmer ? 'Buyers' : 'Sellers'}
        </button>
      </div>

      {/* Results Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">
          {selectedProduce ? 
            `Available ${isFarmer ? 'Businesses' : 'Farmers'} for ${selectedProduce}` : 
            `Select a produce to see available ${isFarmer ? 'businesses' : 'farmers'}`
          }
        </h3>
        
        {loading ? (
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
                <p className="mt-2 text-gray-700">
                  <span className="font-medium">
                    {isFarmer ? 'Wants to Buy' : 'Wants to Sell'}:
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
        ) : selectedProduce ? (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
            <p className="text-yellow-700">No listings found for {selectedProduce}.</p>
            <p className="text-sm text-yellow-600 mt-1">Try selecting a different produce or check back later.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}