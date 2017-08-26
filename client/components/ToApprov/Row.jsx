// @flow

import React from "react";
import moment from "moment";

type RowPropTypes = {
  data: any;
  institutions: any;
};

class Row extends React.Component {
  props: RowPropTypes;

  shouldComponentUpdate (nextProps : RowPropTypes) {
    return (
      this.props.data !== nextProps.data ||
      this.props.institutions !== nextProps.institutions
    );
  }

  render () {
    const { data, institutions } = this.props;

    const
      date = data.get("date"),
      name = data.get("name"),
      authors = data.get("authors");

    return (
      <tr>
        <td
          className="wrap"
          style={{
            width: 190,
          }}>
          {
            moment(date).format("lll")
          }
        </td>
        <td className="w-200">{name}</td>
        <td
          className="small no-wrap" style={{
            width: 300,
          }}>
          {
            authors.map((author) => (
              <div key={author}>
                <span>{"- "}</span>
                {
                  institutions.getIn([
                    author,
                    "name",
                  ])
                }
              </div>
            ))
          }
        </td>
      </tr>
    );
  }
}

export default Row;
