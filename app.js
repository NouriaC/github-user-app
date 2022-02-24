const userHeader = document.getElementById("user-header");
const userDetails = document.getElementById("user-details");
const userInfo = document.getElementById("user-info");
const form = document.querySelector(".form");
const input = document.getElementById("search");

const fetchGithubProfile = (username = "octocat") => {
  let url = "https://api.github.com/users/" + username;
  fetch(url)
    .then((res) => res.json())
    .then(updateCard);
};

const updateCard = (data) => {
  userHeader.innerHTML = `
            <img  class="avatar" src="${data.avatar_url}" alt="user avatar" />
        
          <div class="user-account">
            <h3>${data.name}</h3>
            <p class="username">@${data.login}</p>
            <p>Joined on ${dayjs(data.created_at).format("DD MMM YYYY")}</p>
          </div>`;
  userDetails.innerHTML = `<div class="user-figures">
            <p>Repos</p>
            <p class="numbers">${data.public_repos}</p>
          </div>
          <div class="user-figures">
            <p>Followers</p>
            <p class="numbers">${data.followers}</p>
          </div>
          <div class="user-figures">
            <p>Following</p>
            <p class="numbers">${data.following}</p>
          </div>`;
  userInfo.innerHTML = `<ul class="list-info">
            <li>
              <img src="./assets/icon-location.svg" alt="" />
              <span>${
                data.location === null ? "Not available" : data.location
              }</span>
            </li>
            <li>
              <img src="./assets/icon-website.svg" alt="" />
              <span><a href="${data.blog}">${data.blog}</a></span>
            </li>
            <li>
              <img src="./assets/icon-twitter.svg"/>
              
              <span><a href="${data.twitter_username}">${
    data.twitter_username === null ? "Not available" : data.twitter_username
  }</a></span>
            </li>
            <li>
              <img src="./assets/icon-company.svg" alt="" />
              <span>${
                data.company === null ? "Not available" : data.company
              }</span>
            </li>
          </ul>`;
};

// AJAX call
fetchGithubProfile();

// Event listener
form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchGithubProfile(input.value);
});

// toggle dark/light mode

const toggleBtn = document.getElementById("toggle-btn");
const resultContainer = document.querySelector(".result-container");
const searchName = document.querySelector(".search-name");

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("fa-sun");

  if (toggleBtn.classList.contains("fa-sun")) {
    document.body.classList.add("light");
    resultContainer.classList.add("light");
    searchName.classList.add("light");
    userDetails.classList.add("light");
  } else {
    document.body.classList.remove("light");
    resultContainer.classList.remove("light");
    searchName.classList.remove("light");
    userDetails.classList.remove("light");
  }
});
