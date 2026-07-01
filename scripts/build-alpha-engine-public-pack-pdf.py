from pathlib import Path
import re
import sys

from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
)


ROOT = Path.cwd()
OUT_DIR = ROOT / "collateral" / "alpha-engine"
MD_PATH = OUT_DIR / "L3AI_Alpha_Engine_Public_Narrative_Pack_v1.md"
PDF_PATH = OUT_DIR / "L3AI_Alpha_Engine_Public_Narrative_Pack_v1.pdf"


def clean_inline(text: str) -> str:
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    text = re.sub(r"`([^`]+)`", r"<font name='Courier'>\1</font>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)
    return text


def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#667085"))
    canvas.drawString(0.72 * inch, 0.45 * inch, "L3AI Alpha Engine Public Narrative Pack v1")
    canvas.drawRightString(7.78 * inch, 0.45 * inch, f"Page {doc.page}")
    canvas.restoreState()


def build():
    if not MD_PATH.exists():
        raise SystemExit(f"Missing markdown source: {MD_PATH}")

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="TitleL3",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=25,
            leading=30,
            textColor=colors.HexColor("#101828"),
            spaceAfter=12,
        )
    )
    styles.add(
        ParagraphStyle(
            name="HeadingL3",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=17,
            leading=22,
            textColor=colors.HexColor("#123b8f"),
            spaceBefore=14,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SubheadingL3",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12.5,
            leading=16,
            textColor=colors.HexColor("#27364a"),
            spaceBefore=8,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyL3",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13.5,
            textColor=colors.HexColor("#344054"),
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BulletL3",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13.5,
            leftIndent=13,
            firstLineIndent=-8,
            textColor=colors.HexColor("#344054"),
            spaceAfter=4,
        )
    )

    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=LETTER,
        rightMargin=0.72 * inch,
        leftMargin=0.72 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.68 * inch,
        title="L3AI Alpha Engine Public Narrative Pack v1",
        author="L3AI",
    )

    story = []
    lines = MD_PATH.read_text(encoding="utf8").splitlines()
    table_rows = []

    def flush_table():
        nonlocal table_rows
        if not table_rows:
            return
        processed = []
        for row in table_rows:
            processed.append([Paragraph(clean_inline(cell), styles["BodyL3"]) for cell in row])
        table = Table(processed, repeatRows=1, hAlign="LEFT", colWidths=None)
        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef4ff")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#123b8f")),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d7dee8")),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 6),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                    ("TOPPADDING", (0, 0), (-1, -1), 5),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ]
            )
        )
        story.append(table)
        story.append(Spacer(1, 8))
        table_rows = []

    for line in lines:
        stripped = line.strip()
        if not stripped:
            flush_table()
            continue
        if stripped.startswith("|") and stripped.endswith("|"):
            if re.match(r"^\|\s*-+", stripped):
                continue
            table_rows.append([cell.strip() for cell in stripped.strip("|").split("|")])
            continue
        flush_table()
        if stripped.startswith("# "):
            story.append(Paragraph(clean_inline(stripped[2:]), styles["TitleL3"]))
            story.append(Spacer(1, 8))
        elif stripped.startswith("## "):
            if stripped[3:] in {"Source Evidence Digest", "Release Boundary"}:
                story.append(PageBreak())
            story.append(Paragraph(clean_inline(stripped[3:]), styles["HeadingL3"]))
        elif stripped.startswith("### "):
            story.append(Paragraph(clean_inline(stripped[4:]), styles["SubheadingL3"]))
        elif stripped.startswith("- "):
            story.append(Paragraph("&bull; " + clean_inline(stripped[2:]), styles["BulletL3"]))
        else:
            story.append(Paragraph(clean_inline(stripped), styles["BodyL3"]))

    flush_table()
    doc.build(story, onFirstPage=page_footer, onLaterPages=page_footer)
    print(PDF_PATH)


if __name__ == "__main__":
    build()
