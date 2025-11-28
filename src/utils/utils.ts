export const shortenAddress = (label: string, start = 6, end = -4) => {
    if (label?.length > 10) return `${label.substring(0, start)}...${label.slice(end)}`;
    return label;
  };