$(".dropzone").each((idx, element) => {
  let accept = $(element).attr("data-accept");

  if (accept == undefined) {
    accept = ".jpg, .png, .jpeg, .webp, .ico";
  }

  let id = $('input[name="id"]').val();

  if (id === undefined) id = "";

  Dropzone.options.myAwesomeDropzone = false;
  Dropzone.autoDiscover = false;

  var myDropzone = new Dropzone(element, {
    url: $(element).attr("data-url"),
    parallelUploads: 1,
    acceptedFiles: accept,
    maxFilesize: 2,
    maxFiles: $(element).attr("data-max"),
    params: {
      key: $(element).attr("data-key"),
      id: id,
      url: window.location.href,
    },
    previewsContainer: $(element).find(".dz-preview").attr("id"),
    success: (file, path) => {
      var removeButton = Dropzone.createElement(
        `<a href='${$(element).attr(
          "data-delete"
        )}' class="dz-remove" data-dz-remove>Удалить</a>`
      );

      removeButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        myDropzone.removeFile(file);

        data = {
          key: $(element).attr("data-key"),
          file: path,
        };

        $.ajax({
          url: $(element).attr("data-delete"),
          type: "DELETE",
          data: data,
          success: () => {},
          error: () => {},
        });
      });

      file.previewElement.appendChild(removeButton);
    },
  });
});
