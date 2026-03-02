"use client";

import { useEffect, useState, useRef } from "react";

const ROLES = [
  "Senior Data & AI Engineer",
  "AI Systems Architect",
  "LLM Pipeline Builder",
  "Lakehouse Platform Engineer",
];

const TYPE_SPEED = 52;
const DELETE_SPEED = 30;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

export function TypewriterRole() {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  // Typewriter logic
  useEffect(() => {
    const currentRole = ROLES[roleIndex];

    if (isTyping) {
      if (displayed.length < currentRole.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1));
        }, TYPE_SPEED);
      } else {
        // Finished typing — pause then start deleting
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, PAUSE_AFTER_TYPE);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        // Finished deleting — move to next role
        timeoutRef.current = setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          setIsTyping(true);
        }, PAUSE_AFTER_DELETE);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, isTyping, roleIndex]);

  return (
    <span className="inline-flex items-center">
      <span className="gradient-text font-heading font-extrabold">
        {displayed}
      </span>
      <span
        className="ml-0.5 inline-block h-[0.85em] w-[3px] rounded-sm bg-indigo-400 align-middle"
        style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.1s" }}
      />
    </span>
  );
}
