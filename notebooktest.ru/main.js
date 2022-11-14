let id_book = null;
let curPage = 1;
const pageSize = 1;

async function gerPosts(page = 1){
    let res = await fetch('http://apitest.ru/posts');
    let posts = await res.json();

    if (page == 1) {
        prevButton.style.visibility = "hidden";
      } else {
        prevButton.style.visibility = "visible";
      }
    
      if (page == numPages()) {
        nextButton.style.visibility = "hidden";
      } else {
        nextButton.style.visibility = "visible";
      }

    document.querySelector('.post-list').innerHTML = '';

    posts.filter((row, index) => {
        let start = (curPage - 1) * pageSize;
        let end = curPage * pageSize;
        if (index >= start && index < end) return true;
      }).forEach((post) => {
        document.querySelector('.post-list').innerHTML += `
        <div class="card" style="">
            <div class="card-body">
                <h5 class="card-title">${post.fio}</h5>
                <p class="card-text">${post.company}</p>
                <p class="card-text">${post.phone}</p>
                <p class="card-text">${post.email}</p>
                <p class="card-text">${post.data_birthday}</p>
                <img src="uploads/${post.photo}" style="width: 90px;">
                <a href="#" class="card-link" onclick="removePost(${post.id_book})">Удалить</a>
            </div>
            </div>
        `
    });
}

function previousPage() {
    if (curPage > 1) {
      curPage--;
      gerPosts(curPage);
    }
  }
  
 async function nextPage() {
    let res = await fetch('http://apitest.ru/posts');
    let posts = await res.json();
    if ((curPage * pageSize) < posts.length) {
      curPage++;
      gerPosts(curPage);
    }
  }

 async function numPages() {
    let res = await fetch('http://apitest.ru/posts');
    let posts = await res.json();
    return Math.ceil(posts.length / pageSize);
  }
  
  document.querySelector('#nextButton').addEventListener('click', nextPage, false);
document.querySelector('#prevButton').addEventListener('click', previousPage, false);

async function addPost(){


    const fio = document.getElementById('InputFIO').value,
    company = document.getElementById('InputCompany').value,
    phone = document.getElementById('InputPhone').value,
    email = document.getElementById('InputEmail').value,
    photo = document.getElementById('InputPhoto').files[0],
    data_birthday = document.getElementById('InputBirthday').value;
    

    let formData = new FormData();
    formData.append('fio', fio);
    formData.append('company', company);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('data_birthday', data_birthday);
    formData.append("photo", photo);


    const res = await fetch('http://apitest.ru/posts', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();
}

async function removePost(id_book){
    const res = await fetch(`http://apitest.ru/posts/${id_book}`, {
        method: 'DELETE'
    });

    const data =  await res.json();
    if (data.status === true){
        gerPosts();
    }

}



gerPosts();