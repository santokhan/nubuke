"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Check,
  Youtube,
  Upload,
  User,
  ChevronDown,
} from "lucide-react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formRating, setFormRating] = useState(0);
  const [sortBy, setSortBy] = useState("recent");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    name: "",
    email: "",
    youtube: "",
  });
  const [questionData, setQuestionData] = useState({
    name: "",
    email: "",
    question: "",
  });
  const componentTopRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const savedReviews = localStorage.getItem("user_submitted_reviews");
      const localReviews = savedReviews ? JSON.parse(savedReviews) : [];
      const savedQuestions = localStorage.getItem("user_submitted_questions");
      const localQuestions = savedQuestions ? JSON.parse(savedQuestions) : [];
      setQuestions(localQuestions);

      try {
        const response = await fetch("/reviews.json");
        const jsonReviews = await response.json();
        setReviews([...localReviews, ...jsonReviews]);
      } catch (error) {
        if (localReviews.length > 0) setReviews(localReviews);
      }
    };
    loadData();
  }, []);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") return new Date(b.id) - new Date(a.id);
    if (sortBy === "oldest") return new Date(a.id) - new Date(b.id);
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return 0;
  });

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    componentTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formRating === 0) return alert("Please select a rating");
    const newReview = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      name: formData.name || "Guest User",
      rating: formRating,
      verified: false,
    };
    const updatedUserReviews = [
      newReview,
      ...(JSON.parse(localStorage.getItem("user_submitted_reviews")) || []),
    ];
    localStorage.setItem(
      "user_submitted_reviews",
      JSON.stringify(updatedUserReviews),
    );
    setReviews([newReview, ...reviews]);
    setIsFormOpen(false);
    setFormRating(0);
    setFormData({ title: "", content: "", name: "", email: "", youtube: "" });
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      ...questionData,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };
    const updatedQuestions = [newQuestion, ...questions];
    localStorage.setItem(
      "user_submitted_questions",
      JSON.stringify(updatedQuestions),
    );
    setQuestions(updatedQuestions);
    setIsQuestionFormOpen(false);
    setQuestionData({ name: "", email: "", question: "" });
    alert("Question submitted successfully!");
  };

  const reviewsPerPage = 5;
  const currentReviews = sortedReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage,
  );

  if (reviews.length === 0) return null;

  return (
    <section
      ref={componentTopRef}
      className="xl:max-w-6xl mx-auto xl:px-0 lg:px-12 md:px-8 px-4 p-4 scroll-mt-20 mt-25"
    >
      <div className="flex md:flex-row flex-col justify-center items-center md:justify-between md:items-center text-[#39180F] max-w-3xl mx-auto gap-4">
        <p className="md:text-2xl text-xl   md:hidden font-semibold">
          Customer Reviews
        </p>
        <div className="space-y-1.5 text-center">
          <div className="flex gap-2 items-center justify-center">
            <div className="flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.round(averageRating) ? "#39180F" : "none"}
                  color={
                    i < Math.round(averageRating) ? "#39180F" : "#39180F70"
                  }
                />
              ))}
            </div>
            <span className=" border-b hover:border-none text-sm md:text-lg">
              {averageRating} out of 5
            </span>
          </div>
          <p className=" text-[#39180F]">Based on {totalReviews} reviews</p>
        </div>
        <div className="w-px h-25 hidden md:block bg-[#E5DAC6]"></div>{" "}
        <div className="space-y-3">
          <p className="md:text-2xl text-xl hidden md:block">
            Customer Reviews
          </p>
          <div className="w-50">
            {[5, 4, 3, 2, 1].map((num) => {
              const count = reviews.filter((r) => r.rating === num).length;
              const percentage = (count / totalReviews) * 100;
              return (
                <div key={num} className="flex items-center  text-sm">
                  <div className="flex items-center gap-1 w-14 text[#39180F]">
                    <span className="font-medium">{num}</span>
                    <Star size={14} fill="#39180F" color="#39180F" />
                  </div>
                  <div className="flex-1 h-2 bg-zinc-200 overflow-hidden">
                    <div
                      className="h-full bg-[#39180F]"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-10 text-right text-[#39180F] font-mono">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-px h-25 hidden md:block bg-[#E5DAC6]"></div>
        <div className=" flex flex-col gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              setIsFormOpen(true);
              setIsQuestionFormOpen(false);
            }}
            className="w-full md:px-8 py-2 bg-[#39180F]/90  text-white font-bold hover:opacity-80 transition cursor-pointer "
          >
            Write a Review
          </button>
          <button
            onClick={() => {
              setIsQuestionFormOpen(true);
              setIsFormOpen(false);
            }}
            className="w-full md:px-8 py-2 border-2 border-[#39180F] font-bold  bg-white transition hover:opacity-80 hover:border-[#39180F]/60 cursor-pointer"
          >
            Ask a Question
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="mb-10 p-6 max-w-2xl mx-auto mt-20 text-[#39180F]">
          <div className="text-center space-y-3 mb-3">
            <p className="md:text-2xl text-xl font-semibold">Write a review</p>
            <span className="md:text-md text-sm">Rating</span>
          </div>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={25}
                className="cursor-pointer"
                fill={i < formRating ? "#39180F" : "none"}
                color={i < formRating ? "#39180F" : "#39180F70"}
                onClick={() => setFormRating(i + 1)}
              />
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex justify-center md:text-md text-sm">
              Review Title
            </label>
            <input
              required
              placeholder="Review Title"
              className="w-full p-2 border outline-[#39180F] border-gray-200 text-gray-500 bg-white"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <label className="flex justify-center md:text-md text-sm">
              Review content
            </label>
            <textarea
              required
              placeholder="Review Content"
              rows="4"
              className="w-full p-3 border-gray-200 text-gray-500 outline-[#39180F] bg-white"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
            <label className="flex flex-col justify-center items-center">
              <span className="mb-2 md:text-md text-sm">
                Picture/Video (optional)
              </span>
              <span className="border w-25 h-25 flex items-center justify-center hover:text-[#39180F70] border-gray-200 cursor-pointer text-gray-400">
                <Upload size={50} />
                <input type="file" className="hidden" />
              </span>
            </label>
            <div className="relative">
              <Youtube
                className="absolute left-3 top-3.5 text-zinc-400"
                size={18}
              />
              <input
                placeholder="YouTube"
                className="w-full pl-10 p-2 border border-gray-200 text-gray-500 outline-[#39180F] bg-white"
                value={formData.youtube}
                onChange={(e) =>
                  setFormData({ ...formData, youtube: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap justify-center items-center gap-2 md:text-md text-sm text-[#39180F]">
                <label>Display name (displayed publicly like </label>
                <select
                  className="bg-transparent text-[#39180F]/60 outline-none cursor-pointer"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  defaultValue=""
                >
                  <option value="" disabled>
                    John Smith
                  </option>
                  <option value="Anonymous">Anonymous Review</option>
                  <option value="Alex River">Alex River</option>
                  <option value="Jordan Case">Jordan Case</option>
                  <option value="Taylor Reed">Taylor Reed</option>
                </select>
                <span>)</span>
              </div>
              <input
                type="text"
                required
                placeholder="Name"
                className="w-full p-2 border border-gray-200 text-gray-500 outline-[#39180F] bg-white"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full p-2 border border-gray-200 text-gray-500 outline-[#39180F] bg-white"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <p className="text-center text-sm md:text-md ">
              How we use your data: We&apos;ll only contact you about the review
              you left, and only if necessary. By submitting your review, you
              agree to Judge.me&apos;s terms, privacy and content policies.
            </p>
            <div className="flex gap-3 md:w-8/12 mx-auto">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="flex-1 py-3 font-bold border-2 hover:opacity-80 hover:border-[#39180F]/60 cursor-pointer"
              >
                Cancel Review
              </button>
              <button
                type="submit"
                className="flex-1 py-3 font-bold bg-[#39180F]/90 text-white hover:opacity-80 transition cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}

      {isQuestionFormOpen && (
        <div className="mb-10 p-6 max-w-2xl mx-auto mt-20 text-[#39180F]">
          <div className="text-center space-y-3 mb-6">
            <p className="md:text-2xl text-xl font-semibold">Ask a Question</p>
          </div>
          <form onSubmit={handleQuestionSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="flex justify-center md:text-md text-sm">
                Display name
              </label>
              <input
                required
                placeholder="Your Name"
                className="w-full p-2 border outline-[#39180F] border-gray-200 text-gray-500 bg-white"
                value={questionData.name}
                onChange={(e) =>
                  setQuestionData({ ...questionData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="flex justify-center md:text-md text-sm">
                Email address
              </label>
              <input
                required
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border outline-[#39180F] border-gray-200 text-gray-500 bg-white"
                value={questionData.email}
                onChange={(e) =>
                  setQuestionData({ ...questionData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="flex justify-center md:text-md text-sm">
                Question
              </label>
              <textarea
                required
                placeholder="Write your question here..."
                rows="4"
                className="w-full p-3 border-gray-200 text-gray-500 outline-[#39180F] bg-white"
                value={questionData.question}
                onChange={(e) =>
                  setQuestionData({ ...questionData, question: e.target.value })
                }
              />
            </div>
            <div className="flex gap-3 md:w-8/12 mx-auto pt-4">
              <button
                type="button"
                onClick={() => setIsQuestionFormOpen(false)}
                className="flex-1 py-3 font-bold border-2 hover:opacity-80 hover:border-[#39180F]/60 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 font-bold bg-[#39180F]/90 text-white hover:opacity-80 transition cursor-pointer"
              >
                Submit Question
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="w-full border-y border-[#39180F]/10 mt-12 mb-4">
        <div className="relative inline-block">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-transparent rounded px-4 py-3 pr-10 text-sm  text-[#39180F] focus:outline-none cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="oldest">Oldest</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#39180F]/60"
          />
        </div>
      </div>

      <div className="space-y-0 divide-y text-[#39180F] divide-[#39180F]/10">
        {currentReviews.map((rev) => (
          <div key={rev.id} className="py-8 ">
            <div className="flex justify-between items-center">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < rev.rating ? "#39180F" : "none"}
                    color={i < rev.rating ? "#39180F" : "#39180F60"}
                  />
                ))}
              </div>
              <p className="text-gray-400 text-sm">{rev.date}</p>
            </div>
            <div className="flex gap-3 mb-4">
              <div className="w-10 relative h-10 bg-white border border-zinc-200 flex items-center justify-center text-[#39180F] font-bold uppercase">
                <User />
                <div className="absolute top-5.5 -right-2 bg-[#39180F]/80 text-white w-4 h-4 flex items-center justify-center ">
                  <Check size={10} strokeWidth={4} />
                </div>
              </div>
              <div className="flex gap-2">
                <span className=" text-[#39180F]/80">{rev.name}</span>
                {rev.verified && (
                  <span className="text-[10px] text-white bg-[#39180F]/80 font-bold flex h-4 px-1 gap-1">
                    Verified
                  </span>
                )}
              </div>
            </div>
            <h4 className="font-bold text-lg mb-2">{rev.title}</h4>
            <p className="text-[#39180F] leading-relaxed">{rev.content}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-zinc-200">
        {[...Array(Math.ceil(reviews.length / reviewsPerPage))].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`w-10 h-10 cursor-pointer rounded font-bold transition-all ${currentPage === i + 1 ? "text-2xl text-[#39180F]" : "text-zinc-500 hover:text-[#39180F]/80"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
