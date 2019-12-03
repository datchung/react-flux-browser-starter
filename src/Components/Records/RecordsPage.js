import * as recordActions from "../../Redux/Actions/RecordActions";
import RecordList from "./RecordList";
import Back from "../Common/Back";
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
    redirectToAddRecordPage: false
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

  render() {
    return (
      <>
        {this.state.redirectToAddRecordPage && <Redirect to="/record" />}
        <h2>Records</h2>
        {/* {(this.props.loading || this.state.loading) ? ( */}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <Back history={this.props.history} />
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
      toggleRecord: bindActionCreators(recordActions.toggleRecord, dispatch),
      deleteRecord: bindActionCreators(recordActions.deleteRecord, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordsPage);
