import React from "react";
import { connect } from "react-redux";
import * as recordActions from "../../Redux/Actions/RecordActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import RecordList from "./RecordList";
// import { Redirect } from "react-router-dom";
import Spinner from "../Common/Spinner";
// import { toast } from "react-toastify";

class RecordsPage extends React.Component {
  // state = {
  //   redirectToAddRecordPage: false
  // };

  componentDidMount() {
    const { records, actions } = this.props;

    if (records.length === 0) {
      actions.loadRecords().catch(error => {
        alert("Loading records failed" + error);
      });
    }
  }

  // handleDeleteCourse = async course => {
  //   toast.success("Course deleted");
  //   try {
  //     await this.props.actions.deleteCourse(course);
  //   } catch (error) {
  //     toast.error("Delete failed. " + error.message, { autoClose: false });
  //   }
  // };

  render() {
    return (
      <>
        {/* {this.state.redirectToAddCoursePage && <Redirect to="/course" />} */}
        <h2>Records</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            {/* <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button> */}

            <RecordList
              // onDeleteClick={this.handleDeleteCourse}
              records={this.props.records}
            />
          </>
        )}
      </>
    );
  }
}

RecordsPage.propTypes = {
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
      loadRecords: bindActionCreators(recordActions.loadRecords, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordsPage);
