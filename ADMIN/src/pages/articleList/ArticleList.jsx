import "./articleList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle, getArticles } from "../../redux/apiCalls";

export default function ArticleList() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article.articles);

  useEffect(() => {
    getArticles(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteArticle(id, dispatch);
  };

  //console.log(articles);

  const columns = [
    // { field: "_id", headerName: "ID", width: 220 },
    {
      field: "article",
      headerName: "Article",
      width: 400,
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
      width: 460,
      height: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/article/" + params.row._id}>
              <button className="articleListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="articleListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const rows = articles.map((article) => ({
    ...article,
    id: article._id,
  }));
  console.log(articles.map((article) => article));


  return (
    <div className="articleList">
      <Link to="/newarticle">
        <button className="productAddButton">Create</button>
      </Link>
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={50}
        checkboxSelection
      />
    </div>
  );
}