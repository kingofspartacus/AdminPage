import React from 'react'
import Select from 'react-select'
import { Button } from 'reactstrap'
import "./style.css"

const PaginationPage = ({ page, sizePerPage, total, setPage, setPerPage }) => {
  console.log(total, sizePerPage.value, "sds")
  const setUp = (total, page, sizePerPage) => {

  }

  const opitions = [
    { value: 10, label: 10 },
    { value: 50, label: 50 },
    { value: 100, label: 100 }
  ]
  return (
    <div className="paginationContainer">
      <div className="sizePerPage">
        <Select
          options={opitions}
          defaultValue={sizePerPage}
          onChange={(e) => setPerPage(e)}
        />
      </div>

      <div>
        <Button disabled={page === 0 ? true : false} onClick={() => setPage(page - 1)}>Previous</Button>
        <Button disabled={(page + 1 < total / sizePerPage.value) ? false : true} onClick={() => setPage(page + 1)}>Next</Button>
      </div>

    </div>
  )
}

export default PaginationPage