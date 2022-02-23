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
              <span>${data.blog}</span>
            </li>
            <li>
              <img src="./assets/icon-twitter.svg" alt="" />
              <span>${
                data.twitter_username === null
                  ? "Not available"
                  : data.twitter_username
              }</span>
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
