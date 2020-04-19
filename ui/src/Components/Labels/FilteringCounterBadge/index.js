import React from "react";
import PropTypes from "prop-types";

import { observer } from "mobx-react";

import { motion } from "framer-motion";

import { AlertStore } from "Stores/AlertStore";
import { TooltipWrapper } from "Components/TooltipWrapper";
import { BaseLabel } from "Components/Labels/BaseLabel";

// Same as FilteringLabel but for labels that are counters (usually @state)
// and only renders a pill badge with the counter, it doesn't render anything
// if the counter is 0
const FilteringCounterBadge = observer(
  class FilteringCounterBadge extends BaseLabel {
    static propTypes = {
      alertStore: PropTypes.instanceOf(AlertStore).isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      counter: PropTypes.number.isRequired,
      themed: PropTypes.bool.isRequired,
      alwaysVisible: PropTypes.bool,
      defaultColor: PropTypes.oneOf(["light", "primary"]),
    };
    static defaultProps = {
      defaultColor: "light",
    };

    render() {
      const {
        name,
        value,
        counter,
        themed,
        alwaysVisible,
        defaultColor,
      } = this.props;

      if (!alwaysVisible && counter === 0) return null;

      const cs = this.getClassAndStyle(
        name,
        value,
        "badge-pill components-label-with-hover"
      );

      return (
        <TooltipWrapper
          title={`Click to only show ${name}=${value} alerts or Alt+Click to hide them`}
        >
          <motion.span
            key={counter}
            animate={{ opacity: [1, 0, 1, 0, 1] }}
            className={
              themed
                ? cs.className
                : [
                    `badge-${defaultColor}`,
                    "badge-pill components-label-with-hover",
                    ...cs.baseClassNames,
                  ].join(" ")
            }
            style={themed ? {} : cs.style}
            onClick={(e) => this.handleClick(e)}
          >
            {counter}
          </motion.span>
        </TooltipWrapper>
      );
    }
  }
);

export { FilteringCounterBadge };
