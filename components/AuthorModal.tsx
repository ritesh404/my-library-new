import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Modal from "./Modal";
import { AUTHORS_QUERY, CREATE_AUTHOR, UPDATE_AUTHOR } from "@/lib/gql/author";
import { Author } from "@/lib/types/author";
import { handleImageUpload } from "@/lib/util/uploader";

interface AuthorModalProps {
  onAuthorSuccess: (author: {
    id: string;
    biography: string;
    born_date: string;
    name: string;
  }) => void;
  onAuthorFailure: () => void;
  onCancel: () => void;
  author?: Author | null;
}

const AuthorForm = ({
  onAuthorFailure: onCreateAuthorFailure,
  onAuthorSuccess: onCreateAuthorSuccess,
  onCancel,
  author,
}: AuthorModalProps) => {
  const [name, setName] = useState(author?.name ?? "");
  const [biography, setBiography] = useState(author?.biography ?? "");
  const [bornDate, setBornDate] = useState(
    author?.born_date
      ? new Date(Number(author.born_date)).toISOString().slice(0, 10)
      : ""
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    author?.image_url || ""
  );
  const [isUploading, setIsUploading] = useState(false);

  const [createAuthor, { loading: isCreating }] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [{ query: AUTHORS_QUERY }],
  });

  const [updateAuthor, { loading: isUpdating }] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: AUTHORS_QUERY }],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = author?.image_url;

      if (imageFile) {
        const imageResp = await handleImageUpload(imageFile);
        if (imageResp.success) imageUrl = imageResp.url;
      }

      if (author) {
        const { data } = await updateAuthor({
          variables: {
            id: author.id,
            name,
            biography,
            born_date: bornDate,
            image_url: imageUrl,
          },
        });
        onCreateAuthorSuccess(data.updateAuthor);
      } else {
        const { data } = await createAuthor({
          variables: {
            name,
            biography,
            born_date: bornDate,
            image_url: imageUrl,
          },
        });
        onCreateAuthorSuccess(data.createAuthor);
      }
    } catch (error) {
      console.error("Error creating/updating author:", error);
      onCreateAuthorFailure();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">
        {author ? "Edit Author" : "Create New Author"}
      </h2>

      <div className="mb-4">
        <label className="block mb-2">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Biography</label>
        <textarea
          required
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Born Date</label>
        <input
          required
          type="date"
          value={bornDate}
          onChange={(e) => setBornDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      {isCreating || isUpdating || isUploading ? (
        <div className="text-center">Please wait...</div>
      ) : (
        <>
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
            disabled={isCreating || isUpdating || isUploading}
          >
            {author ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className="px-4 py-2 mt-4 ml-4 text-white rounded bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
        </>
      )}
    </form>
  );
};

const CreateAuthorModal = (props: AuthorModalProps) => {
  return (
    <Modal>
      <div className="mt-2">
        <AuthorForm
          author={props.author}
          onAuthorSuccess={props.onAuthorSuccess}
          onAuthorFailure={props.onAuthorFailure}
          onCancel={props.onCancel}
        />
      </div>
    </Modal>
  );
};

export default CreateAuthorModal;
