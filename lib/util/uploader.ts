export async function handleImageUpload(file: File) {
  //   event.preventDefault();

  // const fileInput = document.querySelector('#fileInput');
  // const file = fileInput.files[0];
  if (!file) {
    console.error("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      return result;
      //   console.log("Upload successful:", result);
    } else {
      //   console.error("Upload failed:", response.statusText);
      return {
        success: false,
      };
    }
  } catch {
    return {
      success: false,
    };
  }
}
