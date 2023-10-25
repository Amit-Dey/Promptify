'use client';
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    const { prompt } = post;
    setCopied(prompt);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => {
      setCopied('');
    }, 3000);
  };

  const isCurrentUserPost = session?.user?.id === post.creator._id;
  const isProfilePath = pathName === "/profile";

  const copiedImageSrc = copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg";

  const userName = post.creator.username?.charAt(0).toUpperCase() + post.creator.username?.slice(1);

  return (
    <div className="prompt_card" key={post._id}>
      <div className="flex justify-between items-start gap-5">
        <Link href={`/profile?username=${post.creator.username}&id=${post.creator._id}`} >
          <div className="flex justify-center items-center gap-3 cursor-pointer">
            <Image
              src={post.creator.image}
              alt="profile picture"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl font-satoshi text-gray-900">
                {userName}
              </h3>
              <p className="font-inter text-lg text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </div>
        </Link>
        <div className="copy_btn" onClick={handleCopy}>
          <Image src={copiedImageSrc} alt="copy" width={25} height={25} />
        </div>
      </div>
      <p className="my-4 font-satoshi text-xl text-justify text-gray-700">{post.prompt}</p>
      <p className="font-inter text-xl blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>
        #{post.tag}
      </p>
      {isCurrentUserPost && isProfilePath && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-xl text-green-600  cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-xl text-red-600 cursor-pointer" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;