import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import React, { createContext, useContext, useState } from "react";
import {
  COVER_PLACEHOLDER,
  Profile,
  PROFILE_PICTURE_PLACEHOLDER,
  usernames,
} from "../../utils/constants";
import FilePicker from "../../utils/FilePicker";
import FormInput from "../FormInput";

dayjs.extend(calendar);

const Context = createContext<Profile | null>(null);

type postType = {
  comment: string;
  picture?: string;
  date: string;
};

const selectPictureHandler = async () => {
  const { base64String, mime } = await FilePicker("image/*");
  return `data:${mime};base64,${base64String}`;
};

function ProfileMarkup({ profile }: { profile: Profile }) {
  const totalFriends = Math.floor(Math.random() * 10000);
  const [posts, setPosts] = useState<postType[]>([]);

  return (
    <Context.Provider value={profile}>
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-96 relative">
          <div
            className="w-full h-80 overflow-hidden rounded-lg hover:cursor-pointer flex items-end justify-end filter  overflow-hidden "
            style={{
              backgroundImage: `url(${
                profile.coverPicture ? profile.coverPicture : COVER_PLACEHOLDER
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="flex p-4 absolute w-full font-bold">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden hover:cursor-pointer  -mt-14 relative border-2 border-white">
              <img
                src={profile.profilePicture || PROFILE_PICTURE_PLACEHOLDER}
                alt="profile-placeholder"
              />
            </div>
            <div className="-mt-3  ml-2 flex-grow">
              <p>{`${profile.firstName} ${profile.secondName}`}</p>
              <p className="text-xs text-neutral-300">{`@${profile.userName}`}</p>
            </div>
            <div className="ml-auto">{`${totalFriends} Friends`}</div>
          </div>
        </div>

        <div className="flex gap-4 sm:flex-row flex-col p-4 sm:pt-2 max-h-[400px]">
          <div className="bg-neutral-800 p-2 rounded-lg space-y-2 font-bold">
            <div>Friends: {totalFriends}</div>
            <div className="grid grid-cols-3 gap-4 items-center ">
              {new Array(9).fill(null).map((_) => (
                <div className="flex flex-col items-center sm:items-baseline w-20">
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <img
                      src={PROFILE_PICTURE_PLACEHOLDER}
                      alt="frind_picture"
                    />
                  </div>
                  <div className="overflow-ellipsis overflow-hidden whitespace-nowrap text-xs font-bold w-11/12 text-cente">
                    {
                      usernames[
                        Math.floor(Math.random() * (usernames.length - 1))
                      ]
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-grow space-y-4 flex flex-col">
            <PostForm onSubmitPost={(post) => setPosts([...posts, post])} />

            {posts.length === 0 ? (
              <div className="bg-neutral-800 p-4 h-full rounded-lg flex flex-col text-center justify-center">
                <p> No Recent Posts</p>
              </div>
            ) : (
              <div className="flex flex-col-reverse">
                {posts.map((post) => (
                  <PostItem post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

const PostForm = ({
  onSubmitPost,
}: {
  onSubmitPost: (post: postType) => void;
}) => {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");

  return (
    <div className="bg-neutral-800 p-4 rounded-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setComment("");
          setImage("");
          onSubmitPost({
            comment,
            picture: image,
            date: new Date().toString(),
          });
        }}
      >
        <FormInput
          name="comment"
          placeholder="Type your comment here"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          required
        />
        {image && <div className="text-green-500 my-2">Image Added</div>}
        <div className="flex gap-3 my-4">
          <button className="p-3 bg-green-700 rounded w-full">
            Create Post
          </button>
          <button
            className="p-3 bg-sky-700 rounded w-full"
            onClick={async () => {
              const newImage = await selectPictureHandler();
              setImage(newImage);
            }}
            type="button"
          >
            Add Image
          </button>
        </div>
      </form>
    </div>
  );
};

const PostItem = ({ post }: { post: postType }) => {
  const profile = useContext(Context);
  return (
    <div className="p-2 bg-neutral-800 rounded-lg space-y-4 my-4">
      <div className="flex gap-3 font-bold">
        <div className="w-16 h-16  rounded-full overflow-hidden border-2 border-white">
          <img
            src={profile?.profilePicture || PROFILE_PICTURE_PLACEHOLDER}
            alt="profile-placeholder"
          />
        </div>
        <div>
          <div>{`${profile?.firstName} ${profile?.secondName}`}</div>
          <div className="text-xs text-neutral-300">@{profile?.userName}</div>
          <div className="text-xs text-neutral-200 my-1 font-normal">{`Created: ${dayjs(
            post.date
          ).calendar()}`}</div>
        </div>
      </div>
      <div className="break-words my-2">{post.comment}</div>

      {post.picture && (
        <div
          className="w-full h-80 overflow-hidden rounded-lg hover:cursor-pointer flex items-end justify-end filter  overflow-hidden "
          style={{
            backgroundImage: `url(${
              post.picture ? post.picture : COVER_PLACEHOLDER
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
    </div>
  );
};

export default ProfileMarkup;
