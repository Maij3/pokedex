import { useTheme, Text, Spacer } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: "0px 20px",
        backgroundColor: theme?.colors.black.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="icono app"
        width={70}
        height={70}
      />
      <Link href="/" style={{ display: "flex" }}>
        <Text color="white" h2>
          P
        </Text>
        <Text color="white" h3>
          okemon
        </Text>
      </Link>

      <Spacer css={{ flex: 1 }} />
      <Text color="gradient">
        <Link
          style={{ textDecoration: "none", color: "white" }}
          href="/favoritos"
        >
          Favoritos
        </Link>
      </Text>
    </div>
  );
};
