import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TableResults from "./TableResults";

export default class TableResultsWrapper extends Component {
  computeSemester = (from, to, enterDate, exitDate, entered) => {
    let presence = null;
    // entered in the location
    if (entered) {
      // not exiting that semester, compute all presence days
      if (exitDate > to) {
        presence = to.diff(from, 'days');
      // exiting that semester, compute all presence days, including departing day
      } else {
        presence = exitDate.diff(from, 'days')+1;
      }
    // not entered yet,
    } else {
      // not entered on that semester, not present so
      if (enterDate > to) {
        presence = 0;
      // entered that semester, compute the number of presence days, including first entering day
      } else {
        presence = enterDate.diff(to, 'days')+1;
      }
    }

    return {
      from,
      to,
      presence
    }
  };
  computeSemesters = (enterDate, exitDate) => {
    let semesters = [];
    let yearFrom = enterDate.year();
    const yearTo = exitDate.year();
    let entered = false;
    while (yearFrom <= yearTo) {
      semesters[yearFrom] = [];

      // 1st semester

      let from = moment([yearFrom, 1,1]);
      let to = moment([yearFrom,3,31]);
      entered = enterDate > to;
      semesters[yearFrom].push({ q1: this.computeSemester(from, to, enterDate, exitDate, entered) });

      // 2nd semester

      from = moment([yearFrom, 4,1]);
      to = moment([yearFrom,6,30]);
      entered = enterDate > to;
      semesters[yearFrom].push({ q2: this.computeSemester(from, to, enterDate, exitDate, entered) });

      // 3rd semester

      from = moment([yearFrom, 7,1]);
      to = moment([yearFrom,9,31]);
      entered = enterDate > to;
      semesters[yearFrom].push({ q3: this.computeSemester(from, to, enterDate, exitDate, entered) });

      // 4th semester

      from = moment([yearFrom, 10,1]);
      to = moment([yearFrom,12,31]);
      entered = enterDate > to;
      semesters[yearFrom].push({ q4: this.computeSemester(from, to, enterDate, exitDate, entered) });

      yearFrom ++;
    }

    return semesters;
  };
  computeMonth = (from, to, enterDate, exitDate, entered) => {
    let presence = null;
    // entered in the location
    if (entered) {
      // not exiting that semester, compute all presence days
      if (exitDate > to) {
        presence = to.diff(from, 'days');
        // exiting that semester, compute all presence days, including departing day
      } else {
        presence = exitDate.diff(from, 'days')+1;
      }
      // not entered yet,
    } else {
      presence = 0;
    }

    return {
      from,
      to,
      presence
    }
  };
  computeMonths = (enterDate, exitDate) => {
    let months = {};
    const yearFrom = enterDate.year();
    const yearTo = exitDate.year();
    let currentYear = yearFrom;
    let entered = false;

    while (currentYear <= yearTo) {
      let month = 0;
      let from = moment([currentYear, 1,1]);
      while (month <= 11) {
        const to = moment(from).endOf('month');
        entered = (enterDate >= from && enterDate <= to && exitDate >= to);
        _.set(months, `${currentYear}.${month}`, this.computeMonth(from, to, enterDate, exitDate, entered));
        from.add(1, 'months');
      }
      //
      // let from = moment([yearFrom, 1,1]);
      // let to = moment([yearFrom,3,31]);
      // entered = enterDate > to;
      // semesters[yearFrom].push({ q1: this.computeSemester(from, to, enterDate, exitDate, entered) });
      //
      // // 2nd semester
      //
      // from = moment([yearFrom, 4,1]);
      // to = moment([yearFrom,6,30]);
      // entered = enterDate > to;
      // semesters[yearFrom].push({ q2: this.computeSemester(from, to, enterDate, exitDate, entered) });
      //
      // // 3rd semester
      //
      // from = moment([yearFrom, 7,1]);
      // to = moment([yearFrom,9,31]);
      // entered = enterDate > to;
      // semesters[yearFrom].push({ q3: this.computeSemester(from, to, enterDate, exitDate, entered) });
      //
      // // 4th semester
      //
      // from = moment([yearFrom, 10,1]);
      // to = moment([yearFrom,12,31]);
      // entered = enterDate > to;
      // semesters[yearFrom].push({ q4: this.computeSemester(from, to, enterDate, exitDate, entered) });

      currentYear ++;
    }

    return months;
  };

  computeValues = () => {
    const { enterDate, exitDate } = this.props;
    const enter = moment(enterDate, 'DD/MM/YYYY');
    const exit = moment(exitDate, 'DD/MM/YYYY');
    return {
      totalDays: exit.diff(enter, 'days')+1,
      months: this.computeMonths(enter, exit),
      // semesters: this.computeSemesters(enter, exit),
    };
  };

  render() {
    return (
      <TableResults
        values={this.computeValues()}
      />
    );
  }
}

TableResultsWrapper.propTypes = {
  enterDate: PropTypes.string.isRequired,
  exitDate: PropTypes.string.isRequired,
};