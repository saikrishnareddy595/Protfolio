import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-3.162 19.488c.5.093.682-.217.682-.483v-1.714c-2.776.603-3.361-1.338-3.361-1.338-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.91.831.091-.646.349-1.087.635-1.337-2.217-.252-4.549-1.108-4.549-4.933 0-1.09.39-1.982 1.03-2.68-.104-.253-.447-1.268.098-2.644 0 0 .84-.269 2.75 1.024A9.55 9.55 0 0 1 12 6.844c.85.004 1.706.115 2.506.337 1.909-1.293 2.747-1.024 2.747-1.024.547 1.376.203 2.391.1 2.644.64.698 1.028 1.59 1.028 2.68 0 3.835-2.336 4.678-4.56 4.926.358.307.677.913.677 1.84v2.726c0 .268.18.58.688.482A10.001 10.001 0 0 0 12 2Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3C4.17 3 3.3 3.9 3.3 5s.86 2 1.95 2h.02c1.1 0 1.97-.9 1.97-2S6.36 3 5.27 3h-.02ZM20.7 13.4c0-3.1-1.65-5.1-4.57-5.1-2.1 0-3.04 1.16-3.57 1.98V8.5H9.2c.04 1.2 0 11.5 0 11.5h3.36v-6.42c0-.34.03-.68.12-.92.27-.68.89-1.39 1.93-1.39 1.36 0 1.9 1.04 1.9 2.56V20H20v-6.6Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
