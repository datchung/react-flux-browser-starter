import * as recordActions from "../../Redux/Actions/RecordActions";
import RecordList from "./RecordList";
import Back from "../Common/Back";
import PageTitle from "../Common/PageTitle";
import FilterSort from "../Common/FilterSort";
import T from '../../Localization/i18n';
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import Spinner from "../Common/Spinner";
import { toast } from "react-toastify";

class RecordsPage extends React.Component {
  state = {
    loading: false,
    filterOptions: ["all", "notDone", "done"],
    selectedFilter: "all",
    sortOptions: ["newestFirst", "oldestFirst"],
    selectedSort: "newestFirst"
  };

  componentDidMount() {
    const { records, actions } = this.props;

    if (records.length === 0) {
      actions.loadRecords().catch(error => {
        toast.error(
          String.format(T.t("loadingRecordsFailed"),
          error));
      });
    }
  }

  handleDeleteRecord = async record => {
    this.setState({
      ...this.state,
      isLoading: true
    });
    try {
      await this.props.actions.deleteRecord(record.id);
      toast.success(T.t("recordDeleted"));
    } catch (error) {
      toast.error(
        String.format(T.t("deleteFailed"), error.message), 
        { autoClose: false });
    }
    this.setState({
      ...this.state,
      isLoading: false
    });
  };

  handleToggleRecord = async record => {
    try {
      await this.props.actions.toggleRecord(record);
    } catch (error) {
      toast.error(
        String.format(T.t("toggleFailed"), error.message),
        { autoClose: false });
    }
  };

  handleFilter = async event => {
    try {
      var filter = event.target.value;
      await this.props.actions.filterRecords(filter);
      this.setState({
        ...this.state,
        selectedFilter: filter
      });
    } catch (error) {
      toast.error(
        String.format(T.t("filterFailed"), error.message),
        { autoClose: false });
    }
  }

  handleSort = async event => {
    try {
      var sort = event.target.value;
      await this.props.actions.sortRecords(sort);
      this.setState({
        ...this.state,
        selectedSort: sort
      });
    } catch (error) {
      toast.error(
        String.format(T.t("sortFailed"), error.message),
        { autoClose: false });
    }
  }

  render() {
    return (
      <>
        <Back history={this.props.history} />
        <PageTitle title={T.t("recordsTitle")} />
        {(this.props.loading || this.state.loading) ? (
          <Spinner />
        ) : (
          <>
            <FilterSort
              filterOptions={this.state.filterOptions}
              selectedFilter={this.state.selectedFilter}
              onFilter={this.handleFilter}
              sortOptions={this.state.sortOptions}
              selectedSort={this.state.selectedSort}
              onSort={this.handleSort}
              />
            <div className="card">
              <div className="card-content">
                <Link to="/record">
                  <button
                    className="button is-primary is-fullwidth"
                    >
                    {T.t("createRecord")}
                  </button>
                </Link>
              </div>
            </div>

            <RecordList
              onToggleClick={this.handleToggleRecord}
              onDeleteClick={this.handleDeleteRecord}
              records={this.props.records}
            />
          </>
        )}
      </>
    );
  }
}

RecordsPage.propTypes = {
  history: PropTypes.object.isRequired,
  records: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    records: state.records,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadRecords: bindActionCreators(recordActions.loadRecords, dispatch),
      filterRecords: bindActionCreators(recordActions.filterRecords, dispatch),
      sortRecords: bindActionCreators(recordActions.sortRecords, dispatch),
      toggleRecord: bindActionCreators(recordActions.toggleRecord, dispatch),
      deleteRecord: bindActionCreators(recordActions.deleteRecord, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordsPage);
