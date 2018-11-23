import React from "react"
import ReactDOM from "react-dom"
import logo from "./asset/logo.png"
import up from "./asset/upvote.svg"
import down from "./asset/downvote.svg"

class Main extends React.Component {
    constructor(props) {

        super(props)
        this.state = {

            news: [],
            search: "iraq",
            sort:"all"

        }
    }
    componentDidMount() {
        let vv = this.state.search
        console.log(vv)
        let link = "https://newsapi.org/v2/everything?q=" + vv + "&apiKey=978d6c3818ff431b8c210ae86550fb1f"
        console.log(link)
        fetch(link)
            .then(result => result.json())
            .then(res => {
                this.setState({
                    news: res.articles
                })
            });

    }
    onchange(event) {

        this.setState({
            search: event.target.value
        })

    }
    keyup(event) {
        if (event.key === "Enter") {
            this.componentDidMount(this.state.search)

        }
    }
    name(){
      
        this.setState({
            sort:"title"
        })
     
    }
    time(){
      
        this.setState({
            sort:"date"
        })
     
    }
    vot(){
      
        this.setState({
            sort:"vote"
        })
     
    }


    render() {
        var items = this.state.news

        return (
            <div>

                <nav>
                    <img src={logo}></img>
                    <input type="text" placeholder="search" onChange={this.onchange.bind(this)} onKeyUp={this.keyup.bind(this)}></input>
                </nav>

                <div id="container">


                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort_By
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item"  onClick={this.name.bind(this)}>Titels</button>
                            <button className="dropdown-item"  onClick={this.time.bind(this)}>Dates</button>
                            <button className="dropdown-item"  onClick={this.vot.bind(this)}>Votees</button>
                        </div>
                    </div>

                    {items.map(item => (


                        <div id="sec" key="item.id">

                            <img width="124px" height="128px" src={item.urlToImage}></img>
                            <div>
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                                <time >{item.publishedAt}</time>
                            </div>

                            <div id="vote">
                                <img src={up}  ></img>
                                <div>{item.counter}</div>
                                <img src={down}></img>


                            </div>
                        </div>
                    ))}

                </div>

            </div>

        );
    }

}




function App() {
    return (

        <Main></Main>
    )
}


ReactDOM.render(<App />, document.getElementById("root"))





// import React, {Component} from 'react';

// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             items: [],
//             isLoaded: false
//         }
//     }
//     componentDidMount() {
//         fetch('https://newsapi.org/v2/everything?q=iraq&apiKey=978d6c3818ff431b8c210ae86550fb1f')
//             .then(res => res.json())
//             .then(json => {
//                 this.setState({
//                     items: json
//                 })
//             });
//     }
//     render() {
//         var { isLoaded, items } = this.state;
//         if (!isLoaded) {
//             return <div>Loading...</div>;
//         }
//         return (
//             <div >

//                 <ul>
//                     {items.map(item => (
//                         <li key="{item.id}">
//                             Name: {item.title} | Email: {item.author}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     }
// }
// ReactDOM.render(<App />, document.getElementById("root"))
