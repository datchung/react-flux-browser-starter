import React from 'react';
import PropTypes from "prop-types";
import T from '../../Localization/i18n';

function FilterSort(props) {
  return (
    <React.Fragment>
      <div className="columns is-mobile">
        <div className="column is-narrow">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label has-text-weight-normal">{T.t("filter")}</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <div className="select">
                    <select
                      value={props.selectedFilter}
                      onChange={props.onFilter}
                      >
                      {props.filterOptions.map(o => {
                        return (<option value={o} key={o}>{T.t(o)}</option>)
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label has-text-weight-normal">{T.t("sort")}</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <div className="select">
                    <select
                      value={props.selectedSort}
                      onChange={props.onSort}
                      >
                      {props.sortOptions.map(o => {
                        return (<option value={o} key={o}>{T.t(o)}</option>)
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

FilterSort.propTypes = {
  filterOptions: PropTypes.array.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  sortOptions: PropTypes.array.isRequired,
  selectedSort: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired
};

export default FilterSort;