"use client";

import Link from "next/link";
import { useComplexConfig, cfgStr, cfgArr } from "@/lib/complexConfigContext";

interface FooterLink {
  label: string;
  href: string;
}

const STATIC_LINKS: FooterLink[] = [
  { label: "Colección", href: "#coleccion" },
  { label: "Proceso", href: "#proceso" },
  { label: "Preguntas", href: "#faq" },
];

export function Footer() {
  const complexConfig = useComplexConfig();
  const rawSection = complexConfig?.sections?.footer;
  const brandName = cfgStr(complexConfig?.brand as unknown, "name", "Nativa Press Co.");
  const brandTagline = cfgStr(
    complexConfig?.brand as unknown,
    "tagline",
    "Bebidas funcionales de temporada para cadenas premium y foodservice."
  );
  const tagline = cfgStr(rawSection, "tagline", brandTagline);
  const email = cfgStr(rawSection, "email", "ventas@nativapress.co");
  const statValue = cfgStr(rawSection, "statValue", "97.4");
  const statSuffix = cfgStr(rawSection, "statSuffix", "%");
  const statLabel = cfgStr(rawSection, "statLabel", "cumplimiento cold-chain");
  const copyright = cfgStr(rawSection, "copyright", `${brandName}. Todos los derechos reservados.`);
  const links = cfgArr<FooterLink>(rawSection, "links", STATIC_LINKS);
  const instagram = cfgStr(complexConfig?.social as unknown, "instagram", "");
  const linkedin = cfgStr(complexConfig?.social as unknown, "linkedin", "");

  const year = new Date().getFullYear();

  // Split brand name for accent on last word
  const nameParts = brandName.split(/(?<=\s)/);
  const firstName = nameParts.slice(0, -1).join("");
  const lastPart = nameParts[nameParts.length - 1] ?? brandName;

  return (
    <footer
      style={{
        background: "var(--ink)",
        borderTop: "1px solid rgba(242,247,238,0.06)",
        padding: "3rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "2rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.3rem",
                letterSpacing: "-0.02em",
                color: "var(--bg)",
                textDecoration: "none",
              }}
            >
              {firstName}<span style={{ color: "var(--accent)" }}>{lastPart}</span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "var(--muted)",
                maxWidth: "32ch",
                lineHeight: 1.55,
              }}
            >
              {tagline}
            </p>
            {(instagram || linkedin) && (
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)")
                    }
                  >
                    Instagram
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)")
                    }
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>

          <nav aria-label="Footer navigation">
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
              }}
            >
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = "var(--bg)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = "var(--muted)")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.15rem",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "var(--bg)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {statValue}<span style={{ color: "var(--accent)" }}>{statSuffix}</span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "var(--muted)",
                fontWeight: 500,
              }}
            >
              {statLabel}
            </span>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(242,247,238,0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--muted)",
            }}
          >
            &copy; {year} {copyright}
          </p>
          <a
            href={`mailto:${email}`}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--accent)",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
            }
          >
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
