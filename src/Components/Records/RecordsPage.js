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
import { Redirect } from "react-router-dom";
import Spinner from "../Common/Spinner";
import { toast } from "react-toastify";

class RecordsPage extends React.Component {
  state = {
    // loading: false,
    redirectToAddRecordPage: false,
    filterOptions: ["all", "notDone", "done"],
    selectedFilter: "all",
    sortOptions: ["newestFirst", "oldestFirst"],
    selectedSort: "newestFirst"
  };

  componentDidMount() {
    const { records, actions } = this.props;

    if (records.length === 0) {
      actions.loadRecords().catch(error => {
        alert("Loading records failed" + error);
      });
    }
  }

  handleDeleteRecord = async record => {
    // this.state.loading = true;
    try {
      await this.props.actions.deleteRecord(record.id);
      // this.state.loading = false;
      toast.success("Record deleted");
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  handleToggleRecord = async record => {
    try {
      await this.props.actions.toggleRecord(record);
    } catch (error) {
      toast.error("Toggle failed. " + error.message, { autoClose: false });
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
      toast.error("Filter failed. " + error.message, { autoClose: false });
    }
  }

  handleSort = async event => {
    // TODO
  }

  render() {
    return (
      <>
        {this.state.redirectToAddRecordPage && <Redirect to="/record" />}
        {/* {(this.props.loading || this.state.loading) ? ( */}
        <Back history={this.props.history} />
        <PageTitle title="Records" />
        {this.props.loading ? (
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
                <button
                  className="button is-primary is-fullwidth"
                  onClick={() => this.setState({ redirectToAddRecordPage: true })}>
                  {T.t("createRecord")}
                </button>
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
      toggleRecord: bindActionCreators(recordActions.toggleRecord, dispatch),
      deleteRecord: bindActionCreators(recordActions.deleteRecord, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordsPage);
