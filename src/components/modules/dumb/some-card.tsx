interface Props {
  children: React.ReactNode;
}

function SomeCard({ children }: Props) {
  return <div>{children}</div>;
}

export default SomeCard;
