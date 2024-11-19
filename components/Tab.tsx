"use client";
import React from "react";

export const tabs = [
  {
    label: "Books",
    id: "books",
  },
  {
    label: "Authors",
    id: "authors",
  },
];

interface TabProps {
  selectedTabId: (typeof tabs)[number]["label"];
}

const Tab: React.FC<TabProps> = ({ selectedTabId }) => {
  return (
    <div className="flex space-x-4 border-b">
      {tabs.map((tab) => (
        <a
          href={`/${tab.id}`}
          key={tab.id}
          className={`px-4 py-2 text-sm font-medium ${
            selectedTabId === tab.id
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 border-b-2 border-transparent"
          }`}
        >
          {tab.label}
        </a>
      ))}
    </div>
  );
};

export default Tab;
