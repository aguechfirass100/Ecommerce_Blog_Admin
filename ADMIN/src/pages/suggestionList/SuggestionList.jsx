import "./suggestionList.css";
import React from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
//  import { Link } from "react-router-dom";
import { useEffect } from "react";
//  import { useDispatch, useSelector } from "react-redux";
import { deleteSuggestedArticle, getSuggestedArticles, acceptSuggestedArticle } from "../../redux/apiCalls";

export default function SuggestedArticleList() {

  const [suggestedArticles, setSuggestedArticles] = React.useState([])

  // useEffect(() => {
  //   const suggestions = getSuggestedArticles()
  //   setSuggestedArticles(suggestions)
  // }, []);

  useEffect(() => {
    const fetchSuggestedArticles = async () => {
      try {
        const suggestions = await getSuggestedArticles();
        setSuggestedArticles(suggestions);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchSuggestedArticles();
  }, []);

  console.log("Those are the suggestions: ", suggestedArticles)

  const handleDelete = (id) => {
    deleteSuggestedArticle(id);
    setTimeout(() => { window.location.reload() }, 2000)
  };

  const handlePost = (id) => {
    acceptSuggestedArticle(id)
    //console.log(acceptedArticle)
    setTimeout(() => { window.location.reload() }, 2000)
  }

  //console.log(articles);

  const columns = [
    // { field: "_id", headerName: "ID", width: 220 },
    {
      field: "article",
      headerName: "Article",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="articleListItem">
            <img className="articleListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "fullName", headerName: "Author", width: 150 },
    {
      field: "desc",
      headerName: "Description",
      width:560,
      height: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button className="articleListEdit" onClick={() => handlePost(params.row._id)} >Post</button>
            <DeleteOutline
              className="articleListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const rows = suggestedArticles.map((suggestedArticle) => ({
    ...suggestedArticle,
    id: suggestedArticle._id,
  }));

  return (
    <div className="articleList">
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={50}
        checkboxSelection
      />
    </div>
  );
}