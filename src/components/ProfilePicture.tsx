import Image from "next/image";
// import { VscAccount } from "react-icons/vsc";

type ProfilePictureProps = {
  src?: string | null;
  className?: string;
};

export function ProfilePicture({ src, className = "" }: ProfilePictureProps) {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {src == null ? null : ( // <VscAccount className="h-full w-full" />
        <Image src={src} alt="Profile Image" quality={100} fill />
      )}
    </div>
  );
}
