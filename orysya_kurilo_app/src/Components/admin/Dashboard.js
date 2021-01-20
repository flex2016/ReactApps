import React, { Component } from "react";
import AdminLayout from "../../Hoc/AdminLayout";

import { firebaseProperties } from "../../firebase";
import { firebaseLooper, reverseArray } from "../ui/misc";

import { ResponsiveBar } from "@nivo/bar";

class Dashboard extends Component {
  state = {
    isloading: true,
    properties: []
  };

  componentDidMount() {
    firebaseProperties.once("value").then(snapshot => {
      const properties = firebaseLooper(snapshot);

      this.setState({
        isloading: false,
        properties: reverseArray(properties)
      });
    });
  }
  render() {
    return (
      <AdminLayout>
        <div className="user__dashboard">
          <div className="user__charts">
            <ResponsiveBar
              data={this.state.properties}
              keys={["area", "rooms", "bathrooms"]}
              indexBy="name"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "black",
                  color: "#38bcb2",
                  size: 4,
                  padding: 1,
                  stagger: true
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "#eed312",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
                }
              ]}
              fill={[
                // {
                //   match: {
                //     id: "area"
                //   },
                //   id: "dots"
                // },
                {
                  match: {
                    id: "date"
                  },
                  id: "lines"
                }
              ]}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Property Name",
                legendPosition: "middle",
                legendOffset: 32
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Area",
                legendPosition: "middle",
                legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default Dashboard;
