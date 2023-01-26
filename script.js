const APIURL = 'https://api.github.com/users/'

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");



async function getUser(username){
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();
    createUserCard(respData);

    getRepos(username);
}


async function getRepos(username){
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();
    addReposToCard(respData);
}



// getUser("firascodes");


function createUserCard(user){
    const cardHTML= `
    <div class="card">
        <div>
            <img class="avatar" src ="${user.avatar_url}" alt="${user.name}"/>
        </div>
        <div class="userinfo">
                <h2>${user.name}</h2>
                <h5>@${user.login}</h5>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                <h4>Repositories: </h4>
                <div class="repos" id="repos">
                </div>
                
        </div>
    </div>
    `;
    main.innerHTML = cardHTML;
}

function addReposToCard(repos){
    const reposEL = document.getElementById("repos");

    repos
    .sort((a,b)=> b.stargazers_count - a.stargazers_count)
    .slice(0,6).forEach(repo => {
        const repoEl= document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href= repo.html_url;
        repoEl.target= "_blank";
        repoEl.innerText= repo.name;
        reposEL.appendChild(repoEl);
    });
}



form.addEventListener('submit', e=>{
    e.preventDefault();

    const user = search.value;
    if(user){
        getUser(user);
        search.value="";
    }
})