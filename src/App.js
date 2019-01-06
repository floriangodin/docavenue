import React, { Component } from 'react';
import JwPagination from 'jw-react-pagination';

import './App.css';
import styled from 'styled-components';




const StyledDiv = styled.div`
  width:100%;
  height:auto;
  margin:auto;
  background-color: rgb(238,238,238);
`;
const StyledTitle = styled.h1`
font-size:2rem;
text-align: center;
padding-top: 10px;
margin-top:0;
font-style: italic;
`;

const StyledPhoto = styled.li`
display: inline-block;
height: auto;
width: 18%;
padding:10px;

  > img{
    width:100%;
    height:100%;
  }
`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      datas: [],
      pageOfItems:[],
      error: null,
      activePage: 1,
      itemPerPage:15,
    };
  }

  fetchData= () => {
    fetch(`https://jsonplaceholder.typicode.com/photos`)
    .then(response => response.json())
    .then(data =>
      this.setState({
        datas: data,
        isLoading: false,
      })
    )
    .catch(error => this.setState({error:error, isLoading:false}));
  };

  handlePageChange = (pageOfItems) => {
    this.setState({
      pageOfItems
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {isLoading, datas, error} = this.state;

    /*var tof = this.state.datas.sort((a, b) => a.title.localeCompare(b.title)).map(image => (
      <StyledPhoto key={image.id}><p>{image.title}</p></StyledPhoto>
    )
  );*/
    return (
      <StyledDiv>
        <StyledTitle>5000 nuances de couleurs</StyledTitle>
        {error ? <p>{error.message}</p> : null}

        {!isLoading ? this.state.pageOfItems.sort((a, b) => a.title.localeCompare(b.title)).map(image => (
            <StyledPhoto key={image.id}><img src={image.url} alt={image.title}/></StyledPhoto>
          )
        ): (
        <p>...isLoading</p>
      )
          }
          <JwPagination items= {datas} onChangePage={this.handlePageChange} pageSize= {15}/>

      </StyledDiv>
    );
  }
}

export default App;
