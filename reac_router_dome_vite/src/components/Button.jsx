export function ButtonProps({ color, label }) {
  return <button style={{ backgroundColor: color }}>{label}</button>;
}

export function ButtonChildren({ color, children }) {
  return <button style={{ backgroundColor: color }}>{children}</button>;
}