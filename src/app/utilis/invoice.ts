/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from "pdfkit";
import AppError from "../errorHelpers/AppHelpers";

export interface IInvoiceData {
    transactionId: string;
    bookingDate: Date;
    userName: string;
    tourTitle: string;
    guestCount: number;
    totalAmount: number;
}

export const generatePdf = async (invoiceData: IInvoiceData): Promise<Buffer<ArrayBufferLike>> => {
    try {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ size: "A4", margin: 50 });
            const buffer: Uint8Array[] = [];

            doc.on("data", (chunk) => buffer.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(buffer)));
            doc.on("error", (err) => reject(err));

            /** ---------- HEADER WITH LOGO ---------- */
            const logoPath = "https://res.cloudinary.com/dkxmy7tds/image/upload/v1753551880/2y5heqeoguf-1753551880253-4620227501221171993744892565473398122367056885n-jpg.jpg.jpg"; 
            try {
                doc.image(logoPath, 50, 40, { width: 80 });
            } catch (e) {
                console.log("Logo not found, skipping..." , e);
            }

            doc
                .fillColor("#333333")
                .fontSize(26)
                .text("TravelMate Tours & Travels", 150, 50)
                .fontSize(12)
                .fillColor("#777777")
                .text("123 Main Street, Dhaka, Bangladesh", 150, 80)
                .text("Email: support@travelmate.com | Phone: +880 1234-567890", 150, 95);

            // Invoice Label
            doc
                .fillColor("#ffffff")
                .rect(400, 40, 140, 40)
                .fill("#0077cc")
                .stroke()
                .fontSize(20)
                .fillColor("#ffffff")
                .text("INVOICE", 410, 52);

            /** ---------- DIVIDER ---------- */
            doc.moveTo(50, 130).lineTo(550, 130).strokeColor("#cccccc").lineWidth(1).stroke();

            /** ---------- CUSTOMER & INVOICE INFO ---------- */
            doc.moveDown().moveDown();
            doc.fontSize(14).fillColor("#000000").text("Bill To:", 50, 150).moveDown(0.3);
            doc
                .fontSize(12)
                .fillColor("#333333")
                .text(invoiceData.userName, 50)
                .text(`Transaction ID: ${invoiceData.transactionId}`, 50)
                .text(`Booking Date: ${invoiceData.bookingDate.toDateString()}`, 50);

            /** ---------- BOOKING DETAILS TABLE ---------- */
            const tableTop = 250;
            doc.fontSize(14).fillColor("#000000").text("Booking Details", 50, tableTop - 30);

            // Table Header
            doc
                .rect(50, tableTop, 500, 25)
                .fill("#0077cc")
                .stroke();
            doc
                .fontSize(12)
                .fillColor("#ffffff")
                .text("Tour Title", 60, tableTop + 7)
                .text("Guests", 300, tableTop + 7)
                .text("Total Amount", 420, tableTop + 7);

            // Table Row
            doc
                .rect(50, tableTop + 25, 500, 30)
                .fill("#f9f9f9")
                .stroke();
            doc
                .fontSize(12)
                .fillColor("#333333")
                .text(invoiceData.tourTitle, 60, tableTop + 35)
                .text(invoiceData.guestCount.toString(), 300, tableTop + 35)
                .text(`$${invoiceData.totalAmount.toFixed(2)}`, 420, tableTop + 35);

            /** ---------- TOTAL BOX ---------- */
            doc
                .rect(350, tableTop + 80, 200, 40)
                .fill("#eeeeee")
                .stroke();
            doc
                .fontSize(14)
                .fillColor("#333333")
                .text("Grand Total:", 360, tableTop + 90)
                .fontSize(16)
                .fillColor("#0077cc")
                .text(`$${invoiceData.totalAmount.toFixed(2)}`, 460, tableTop + 90);

            /** ---------- THANK YOU NOTE ---------- */
            doc.moveDown().moveDown().moveDown();
            doc
                .fontSize(14)
                .fillColor("#555555")
                .text("Thank you for booking with TravelMate!", { align: "center" });

            /** ---------- FOOTER ---------- */
            doc.moveTo(50, 760).lineTo(550, 760).strokeColor("#cccccc").lineWidth(1).stroke();
            doc
                .fontSize(10)
                .fillColor("#aaaaaa")
                .text("TravelMate Tours & Travels | www.travelmate.com | All rights reserved.", 50, 770, { align: "center" });

            /** END PDF */
            doc.end();
        });
    } catch (error: any) {
        console.log(error);
        throw new AppError(401, `Pdf creation error ${error.message}`);
    }
};
