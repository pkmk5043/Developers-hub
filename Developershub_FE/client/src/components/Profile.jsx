import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams()

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ fullname: "", email: "", mobile: "", skill: "" });

  const [showReviewModal, setShowReviewModal] = useState(false); // NEW
  const [rating, setRating] = useState(0); // NEW

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/profile/${id}?x-token=${token}`
        );
        setUser(res.data);
        setForm({
          fullname: res.data.fullname || "",
          email: res.data.email || "",
          mobile: res.data.mobile || "",
          skill: res.data.skill || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmitReview = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/addreview?x-token=" + token, {
        taskworker: user._id,
        rating: rating,
      });
      alert("Review submitted successfully!");
      setShowReviewModal(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <div className="no-data">No profile data found.</div>;

  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src="..." alt="Profile" />
      </div>
      <div className="profile-details">
        {isEditing ? (
          <div className="edit-form">
            <input value={form.fullname} onChange={e=>setForm({...form, fullname:e.target.value})} placeholder="Full name" />
            <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" />
            <input value={form.mobile} onChange={e=>setForm({...form, mobile:e.target.value})} placeholder="Mobile" />
            <input value={form.skill} onChange={e=>setForm({...form, skill:e.target.value})} placeholder="Skill" />
          </div>
        ) : (
          <>
            <h2>{user.fullname}</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Mobile:</strong> {user.mobile}
            </p>
            <p>
              <strong>Skills:</strong> {user.skill}
            </p>
          </>
        )}
        <div className="profile-buttons">
          {isEditing ? (
            <>
              <button className="edit-btn" onClick={async ()=>{
                const token = localStorage.getItem("token");
                try {
                  const res = await axios.put(`http://localhost:5000/profile/${user._id}?x-token=${token}`, form);
                  alert("Profile updated");
                  setUser(res.data.user);
                  setIsEditing(false);
                } catch (e) {
                  alert(e.response?.data?.message || "Update failed");
                }
              }}>Save</button>
              <button className="back-button" onClick={()=>{ setIsEditing(false); setForm({ fullname:user.fullname||"", email:user.email||"", mobile:user.mobile||"", skill:user.skill||""}); }}>Cancel</button>
            </>
          ) : (
            <button className="edit-btn" onClick={()=> setIsEditing(true)}>Edit Profile</button>
          )}
          <button
            className="review-btn"
            onClick={() => setShowReviewModal(true)}
          >
            Give Review
          </button>
          <button className="back-button" onClick={() => navigate(-1)}>
            ⬅️ Go Back
          </button>
        </div>
      </div>

      {/* Place the modal component here */}
      {showReviewModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Give Your Rating</h3>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              placeholder="Enter rating (1 to 5)"
            />
            <div className="modal-buttons">
              <button onClick={handleSubmitReview}>Submit</button>
              <button onClick={() => setShowReviewModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div> // closing the main div
  );
};

export default Profile;
