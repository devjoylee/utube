<!-- PROJECT LOGO -->
<div align="center">
  <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="Logo" width="80" height="55">
  <h1>Youtube Clone Project</h1>
  <p>
    <a href="https://utube-page.web.app" target="_blank">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details align="right">
  <summary>Table of Contents</summary>
    <div><a href="#About-The-Project">About The Project</a></div>
    <div><a href="#Built-With">Built With</a></div>
    <div><a href="#Getting-Started">Getting Started</a></div>
    <div><a href="#Main-Features">Main Features</a></div>
    <div><a href="#Commit-Convention">Commit Convention</a></div>
</details>

## About The Project

> Redux-based YouTube clone project using Firebase and YouTube APIs. You can sign in with Google (provided by Firebase Authentication) and enjoy the synchronized Youtube service here (provided by Youtube API)!

### State Management with Redux and Redux-Thunk

- Used **Redux and Redux-thunk** to efficiently manage **asynchronous states**.
  **_[📝 Read More in my blog](https://devjoylee.github.io/tags?q=redux)_**
- Folder structure

```markdown
redux
├── actions
│ ├── auth.action.js
│ ├── channel.action.js
│ ├── comment.action.js
│ └── video.action.js
├── reducers
│ ├── auth.reducer.js
│ ├── channel.reducer.js
│ ├── comment.reducer.js
│ └── video.reducer.js
└── store.js
```

- Production Period : 2022.03.06 - 2022.03.29

<br/>

## Built With

<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">&nbsp;&nbsp;<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">&nbsp;&nbsp;<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">&nbsp;&nbsp;<img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=storybook&logoColor=white"/>

<br/>

## Getting Started

You are able to start the app by typing the following commands in the command line:

```bash
git clone https://github.com/devjoylee/utube.git
npm install
npm start
```

<br/>

## Main Features

### 1. Login Page (Intro)

- **OAuth Service**
- Implemented Google sign-in using Firebase's Authentication provider
  **_[📝 Read More in my blog](https://devjoylee.github.io/series/OAuth-Service)_**
- Get `access token` from the provider and save it in **sessionStorage** to authenticate an user

<div align="center">
<img src="https://user-images.githubusercontent.com/68415905/220285284-3b2490b2-b9e3-47ea-a26b-275fcc59e451.JPG" alt="img" width="60%" >
</div><br/>

- Code Preview

```jsx
// pages/loginPage.js
export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);

  // when the login button is clicked, activate login action
  const handleLogin = () => {
    dispatch(login());
  };

  // redirect to main page when logged in successfully
  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  return <div className='login_page'>// ...</div>;
};
```

```jsx
// redux/actions/auth.action.js
// Add google authentication provider
export const login = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');

    const res = await auth.signInWithPopup(provider);

    const accessToken = res.credential.accessToken;
    const profile = {
      name: res.additionalUserInfo.profile.name,
      photoURL: res.additionalUserInfo.profile.picture,
    };

    sessionStorage.setItem('youtube-token', accessToken);
    sessionStorage.setItem('youtube-user', JSON.stringify(profile));

    dispatch({ type: LOGIN_SUCCESS, payload: accessToken });
    dispatch({ type: LOAD_PROFILE, payload: profile });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};
```

<br/>

### 2. Main Page

- **VIDEOs** : If you click each video, it will link to the view page of the video.
- **CATEGORY** : If you click a category at the top of the main page, it will return new video list about the category keyword.
- **SEARCH BAR** : If you search any keyword through the search bar, it will link to to the search results page.
- Implemented **infinite scrolling** using `react-infinite-scroll-component` library.
- When loading videos, utilized the `Skeleton UI` to improve the user experience.

<div align="center">
<img src="https://user-images.githubusercontent.com/68415905/220286772-15e8abaf-85c8-4cb3-952c-9a7f3b70cb21.jpg" alt="img" width="90%" >
</div><br/>

- Code Preview

```jsx
// components/Main/Video/VideoList.js
export const VideoList = ({ loadVideos }) => {
  const dispatch = useDispatch();

  // get video list using redux
  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector((state) => state.mainVideo);

  const fetchData = async () => {
    await loadVideos(activeCategory);
  };

  return (
    <div className='video-container'>
      {/*  Custom Infinite Scroll */}
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        className='video-list'
      >
        {loading || !videos.length
          ? // when loading videos, show the skeleton UI
            [...Array(20)].map((_, i) => <SkeletonVideo key={i} />)
          : videos.map((video, i) => <Video key={i} video={video} />)}
      </InfiniteScroll>
    </div>
  );
};
```

<br/>

### 3. Watch Page

- You can play the video here and see all details such as channel, description, comments, likes, etc
- It has a **related video list** on the right side of the page.
- When loading a video, utilized the `Skeleton UI` to improve the user experience.
- You can actually **leave comments** at the comment section. It will directly leave comments on the video you are watching by synchronizing with your Google account.
- Code Preview

```jsx
// components/Watch/Comment/CommentList.js
export const CommentList = ({ videoId, video }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.commentList.comments);
  const commentCount = video?.statistics?.commentCount;

  const handleChange = (e) => setText(e.target.value);

  const handleComment = (e) => {
    e.preventDefault();
    if (text.length === 0) return;

    // POST comment
    dispatch(addComment(videoId, text));
    // GET comment
    setTimeout(() => dispatch(getCommentsById(videoId)), 2500);
    setText('');
  };

  useEffect(() => {
    dispatch(getCommentsById(videoId));
  }, [videoId, dispatch]);

  return <div className='comments'>// ...</div>;
};
```

<br/>

### Search Result Page

- It will display a list of videos about the keyword you searched from the search bar.
- Implemented **infinite scrolling** using `react-infinite-scroll-component` library.
- When loading list, utilized the `Skeleton UI` to improve the user experience.

<br/>

### Subscription Page

- It will show a list of channels you are subscribed by synchronizing with your Google account.
- Implemented **infinite scrolling** using `react-infinite-scroll-component` library.
- When loading list, utilized the `Skeleton UI` to improve the user experience.

<br/>

## Commit Convention

The commit message is written with the GITMOJI icons in order to make commit messages more intuitive.

| Gitmoji | Meaning                     |
| ------- | --------------------------- |
| 🎉      | Init or begin a project.    |
| 🚚      | Move or rename resources    |
| ✨      | Introduce new features      |
| 💄      | Add the UI and style files  |
| ♻️      | Refactor code               |
| 📝      | Add or update documentation |
| ➕      | Add a dependency            |
| 🐛      | Fix a bug                   |
| 🚀      | Deploy stuff                |

REFERENCE : Gitmoji (http://gitmoji.dev/)

<br/>

<p align="right">(<a href="#top">back to top</a>)</p>
