

import React, { useEffect, useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, LoaderIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PasswordsTable from "../components/PasswordsTable";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 25;

const PasswordsPage = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  // search + pagination
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const navigate = useNavigate();

  const fetchCredentials = async () => {
    try {
      setLoading(true);
      const res = await api.get("/credentials");
      // Expecting decrypted password in response per your backend controller
      setAllData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching credentials", err);
      toast.error("Error fetching passwords");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  // search (frontend)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allData;
    return allData.filter((item) => {
      const t = `${item.title || ""}`.toLowerCase();
      const w = `${item.websiteURL || ""}`.toLowerCase();
      const e = `${item.email || ""}`.toLowerCase();
      const u = `${item.username || ""}`.toLowerCase();
      return t.includes(q) || w.includes(q) || e.includes(q) || u.includes(q);
    });
  }, [allData, query]);

  // pagination (frontend)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageData = filtered.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    // if query changes, reset to first page
    setPage(1);
  }, [query]);

  // Handlers
  const handleEdit = (item) => {
    if (!item?._id) {
      toast.error("Invalid credential selected");
      return;
    }
    // Navigate to create page with ID and state
    navigate(`/${item._id}`, { state: { editMode: true, credentialData: item } });
  };

  const openDeleteModal = (item) => {
    setPendingDelete(item);
    setDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteOpen(false);
    setPendingDelete(null);
  };

  const confirmDelete = async () => {
    if (!pendingDelete?._id) return;
    try {
      setLoading(true);
      await api.delete(`/credentials/${pendingDelete._id}`);
      toast.success("Credential deleted");
      setAllData((prev) => prev.filter((x) => x._id !== pendingDelete._id));
    } catch (err) {
      console.error("Delete error", err);
      toast.error("Failed to delete credential");
    } finally {
      setLoading(false);
      closeDeleteModal();
    }
  };

  {/* Loading overlay */}
    if (loading) {
      return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <LoaderIcon className="animate-spin size-10 text-lime-500" />
        </div>
      );
    }

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="relative h-full flex flex-col bg-black">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 lg:max-w-5xl text-white">
          {/* Heading */}
          <h1 className="text-center text-3xl md:text-4xl font-black mt-6">
            Stored Credentials
          </h1>
          <div className="flex justify-center mt-2 mb-6">
            <span className="inline-block h-1 bg-lime-400 w-md rounded-full" />
          </div>
          <p className="text-center text-gray-300 mb-6">
            View, edit, and manage your saved credentials.
          </p>

          {/* Search */}
          <div className="flex justify-center mb-5">
            <div className="relative w-full max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:border-lime-500 focus:outline-none"
                placeholder="Search by title, website, email, or username…"
              />
            </div>
          </div>

          {/* Table */}
          <PasswordsTable
            data={pageData}
            loading={loading}
            onEdit={handleEdit}
            onDeleteRequest={openDeleteModal}
          />

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-6 mb-4">
              <button
                onClick={goPrev}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-900/60 border border-gray-700 hover:border-lime-500 disabled:opacity-50"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`px-3 py-1 rounded-md border ${
                      n === currentPage
                        ? "bg-lime-600 text-black border-lime-600"
                        : "bg-gray-900/60 text-white border-gray-700 hover:border-lime-500"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <button
                onClick={goNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-900/60 border border-gray-700 hover:border-lime-500 disabled:opacity-50"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      <div className="mt-6">
        <Footer />
      </div>

      {/* DaisyUI Delete Modal */}
      <div className={`modal ${deleteOpen ? "modal-open" : ""}`}>
        <div className="modal-box bg-gray-900 text-white border border-gray-700">
          <h3 className="font-bold text-lg text-lime-400">Delete Credential</h3>
          <p className="py-3 text-gray-300">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">
              {pendingDelete?.title || pendingDelete?.websiteURL || pendingDelete?.email}
            </span>
            ?
          </p>
          <div className="modal-action">
            <button
              className="btn btn-sm bg-gray-800 border-gray-700 hover:border-lime-500"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm bg-red-600 border-red-600 text-white hover:brightness-110"
              onClick={confirmDelete}
            >
              Yes, delete
            </button>
          </div>
        </div>
        <div className="modal-backdrop" onClick={closeDeleteModal} />
      </div>
    </div>
  );
};

export default PasswordsPage;
