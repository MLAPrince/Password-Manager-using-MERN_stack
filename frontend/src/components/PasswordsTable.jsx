


import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Copy, Check, Pencil, Trash2, LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import NoCredFound from "./NoCredFound";

const normalizeUrl = (url = "") => {
  const u = url.trim();
  if (!u) return "#";
  if (/^https?:\/\//i.test(u)) return u;
  if (/^www\./i.test(u)) return `https://${u}`;
  return `https://${u}`;
};

const PasswordsTable = ({
  data = [],
  loading = false,
  onEdit,
  onDeleteRequest, // item => void (opens modal in parent)
}) => {
  // Track per-row temporary reveal state
  const [revealed, setRevealed] = useState({});
  const hideTimers = useRef({});

  // Track which row was just copied
  const [copiedId, setCopiedId] = useState(null);
  const copyTimer = useRef(null);

  useEffect(() => {
    return () => {
      Object.values(hideTimers.current).forEach(clearTimeout);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const toggleReveal = (id) => {
    setRevealed((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        if (hideTimers.current[id]) clearTimeout(hideTimers.current[id]);
        hideTimers.current[id] = setTimeout(() => {
          setRevealed((p) => ({ ...p, [id]: false }));
          delete hideTimers.current[id];
        }, 5000); // auto-hide after 5s
      } else {
        if (hideTimers.current[id]) {
          clearTimeout(hideTimers.current[id]);
          delete hideTimers.current[id];
        }
      }
      return next;
    });
  };

  const copyToClipboard = async (id, value, label = "Copied") => {
    try {
      await navigator.clipboard.writeText(value || "");
      setCopiedId(id);
      toast.success(`${label}`);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopiedId(null), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const mask = (str = "") => "•".repeat(Math.max(6, Math.min(str.length, 16)));

  // Empty state using your component
  if (!loading && (!data || data.length === 0)) {
    return (
      <div className="bg-gray-900/60 rounded-lg">
        <NoCredFound />
      </div>
    );
  }

  
  return (
    <div className="relative w-full overflow-x-auto rounded-lg bg-gray-900/60">


      <table className="min-w-full text-left text-sm text-gray-300">
        <thead>
          <tr className="bg-lime-700 text-black sticky top-0 z-20">
            <th className="px-4 py-3 font-semibold text-left">Title</th>
            <th className="px-4 py-3 font-semibold text-left">Website</th>
            <th className="px-4 py-3 font-semibold text-left">Email</th>
            <th className="px-4 py-3 font-semibold text-left">Password</th>
            <th className="px-3 py-3 font-semibold text-center w-[90px]">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => {
            const isRevealed = !!revealed[item._id];
            return (
              <tr
                key={item._id}
                className="border-t border-gray-700 hover:bg-gray-800/60 transition-colors"
              >
                {/* Title */}
                <td className="px-4 py-3">
                  <span
                    className="block truncate max-w-[180px] font-semibold text-white"
                    title={item.title || "-"}
                  >
                    {item.title || "-"}
                  </span>
                </td>

                {/* Website */}
                <td className="px-4 py-3">
                  {item.websiteURL ? (
                    <a
                      href={normalizeUrl(item.websiteURL)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:underline block truncate max-w-[220px]"
                      title={item.websiteURL}
                    >
                      {item.websiteURL}
                    </a>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>

                {/* Email */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="block truncate max-w-[220px]" title={item.email}>
                      {item.email || "-"}
                    </span>
                    {item.email && (
                      <button
                        onClick={() => copyToClipboard(item._id + "_email", item.email, "Email copied")}
                        className="p-1.5 rounded-md hover:bg-gray-700 transition"
                        title="Copy email"
                      >
                        {copiedId === item._id + "_email" ? (
                          <Check className="w-4 h-4 text-lime-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>
                </td>

                {/* Password */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span
                      className={`${
                        isRevealed ? "text-white" : "text-gray-400 select-none"
                      } block truncate max-w-[160px]`}
                      title={isRevealed ? item.password : undefined}
                    >
                      {isRevealed ? item.password || "-" : mask(item.password)}
                    </span>

                    {/* Reveal / Hide */}
                    <button
                      onClick={() => toggleReveal(item._id)}
                      className="p-1.5 rounded-md hover:bg-gray-700 transition"
                      title={isRevealed ? "Hide password" : "Reveal password (auto-hides)"}
                    >
                      {isRevealed ? (
                        <EyeOff className="w-4 h-4 text-lime-400/60" />
                      ) : (
                        <Eye className="w-4 h-4 text-lime-400/60" />
                      )}
                    </button>

                    {/* Copy */}
                    {item.password && (
                      <button
                        onClick={() => copyToClipboard(item._id + "_pwd", item.password, "Password copied")}
                        className="p-1 rounded-md hover:bg-gray-700 transition"
                        title="Copy password"
                      >
                        {copiedId === item._id + "_pwd" ? (
                          <Check className="w-4 h-4 text-lime-400 " />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400 " />
                        )}
                      </button>
                    )}
                  </div>
                </td>

                {/* Actions (compact, fixed width) */}
                <td className="px-3 py-3">
                  <div className="flex items-center justify-center gap-0">
                    <button
                      onClick={() => onEdit?.(item)}
                      className="p-2 rounded-md hover:bg-blue-300/60 hover:text-black transition"
                      title="Edit"
                      aria-label={`Edit ${item.title || item.websiteURL || item.email}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDeleteRequest?.(item)}
                      className="p-2 rounded-md hover:bg-red-600 hover:text-white transition"
                      title="Delete"
                      aria-label={`Delete ${item.title || item.websiteURL || item.email}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PasswordsTable;
