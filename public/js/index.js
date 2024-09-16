function deleteEvent() {
  var btn = document.getElementById("deleteBtn");
  let id = btn.getAttribute("data-id");

  axios.delete("/events/delete/" + id)
    .then(res => {
      console.log(res.data);
      alert('Event deleted successfuly');
      window.location.href = '/events/1'
    })
    .catch(err => {
      console.log(err);
    })
}


function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      let image = document.getElementById('imagePlaceholder');
      image.style.display = 'block';
      image.src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
  }
}