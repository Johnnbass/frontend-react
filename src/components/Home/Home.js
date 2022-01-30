import React, { Component } from "react";
import { Table } from "react-bootstrap";
import css from "./home.module.scss";
import api from "../../api";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      page: 1,
      data: [],
      pagination: {},
      loading: true,
      openedContent: null
    };
  }

  async componentDidMount() {
    this.setPage();
  };

  handleNextPage = () => {
    let { page, pagination } = this.state;

    if (!(page === pagination.pages)) {
      ++page;
      this.setState({page: page});
      this.setPage();
    }
  }

  handlePreviousPage = () => {
    let { page } = this.state;

    if (!(page === 1)) {
      --page;
      this.setState({page: page});
      this.setPage();
    }
  }

  selectPage = (e) => {
    const page = e.target.innerHTML;
    this.setState({page: parseInt(page)});
    this.setPage();
  }

  async setPage() {
    this.setState({loading: true})
    const response = await fetch(
      `${api.getPosts}?_format=json&access-token=${api.token}&page=${this.state.page}`
    );
    
    if (!response.ok) {
      throw new Error(
        `An error has occured: [${response.status}] - ${response.statusText}`
      );
    }
      
    const json = await response.json();
    this.setState({
      data: json.data,
      pagination: json.meta.pagination,
      loading: false
    });
  }

  toggleContent = (e) => {
    const id = parseInt(e.target.getAttribute("id"));
    let { openedContent } = this.state;

    this.setState({
      openedContent: openedContent === id ? null : id
    });
  }

  render() {
    const { data, pagination, loading, openedContent } = this.state;
    let { page } = this.state;
    
    return (
      <div className={css.background}>
        <div className={[css.container, "p-3"].join(" ")}>
          <h5 className="m-3">Últimas postagens</h5>
          <Table bordered responsive hover>
            <tbody>
              <tr className={css.tableHeader}>
                <th className={css.title}>Título</th>
                <th>Postagem</th>
              </tr>
              {loading 
                ? <tr>
                    <td colSpan={2}>
                      <div class="d-flex justify-content-center">
                        <div className="spinner-grow" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                : data.map((p, i) => (
                  <>
                    <tr key={i} className="text-truncate" onClick={this.toggleContent}>
                      <td id={p.id}>{p.title}</td>
                      <td id={p.id}>{p.body}</td>
                    </tr>
                    {openedContent === p.id
                      ? <tr>
                          <td colSpan={2} className={css.fadeIn}>
                            <cite>
                              <p>{p.title}</p>
                              <p>{p.body}</p>
                            </cite>
                          </td>
                        </tr>
                      : <></>
                    }
                  </>
              ))}
            </tbody>
          </Table>
          <div className="row">
            <div className="col-md-6 text-start">
              Exibindo <strong>{pagination.limit}</strong> de <strong>{pagination.total}</strong> resultados
            </div>
            <div className="col-md-6 text-end">
                <span className={[css.pageNumber, (page === 1 ? css.disabledPaginationButton : css.paginationButton)].join(' ')} onClick={this.handlePreviousPage}>&lt;</span>
                <span className={css.pageNumber} onClick={this.selectPage}>1</span>
                {page <= 2 ? '...' : <span className={css.pageNumber} onClick={this.selectPage}>{page - 1}</span>}
                <span className={[css.pageNumber, css.activePageNumber].join(' ')} onClick={this.selectPage}>{page}</span>
                {page >= (pagination.pages - 1) ? '...' : <span className={css.pageNumber} onClick={this.selectPage}>{page + 1}</span>}
                <span className={css.pageNumber} onClick={this.selectPage}>{pagination.pages}</span>
                <span className={[css.pageNumber, (page === pagination.pages ? css.disabledPaginationButton : css.paginationButton)].join(' ')} onClick={this.handleNextPage}>&gt;</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
