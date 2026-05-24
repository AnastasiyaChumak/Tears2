"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type AllPosts = RouterOutput["post"]["getAll"];
type Post = AllPosts[number];

type Props = {
  posts: AllPosts;
  latestPost: Post | null;
};


export function ClientContent({ posts, latestPost }: Props) {
  const [name, setName] = useState("");
  const utils = api.useUtils();

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      <div className="mb-4">
        <h2>Latest Post</h2>
        {latestPost ? (
          <p className="truncate">{latestPost.name}</p>
        ) : (
          <p>No posts yet</p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2 mb-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>

      <div>
        <h1>All Posts</h1>
        {posts.map((p) => (
          <div key={p.id}>{p.name}</div>
        ))}
      </div>
    </div>
  );
}