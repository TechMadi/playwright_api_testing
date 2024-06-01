import { test, expect } from "@playwright/test";
import { getAuthToken } from "../../util";

/***
 * Organize my endpoints in files
 */
test.describe("booking/ GET requests", async () => {
  let cookies = "";

  test.beforeAll(async ({ request }) => {
    const response = await request.post("auth/login", {
      data: {
        username: "admin",
        password: "password",
      },
    });

    expect(response.status()).toBe(200);
    const headers = await response.headers();
    console.log(headers, "header");
    cookies = getAuthToken(headers["set-cookie"]);
  });
  test("GET booking summary  with speific room id ", async ({ request }) => {
    const response = await request.get("booking/summary?roomid=1");

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.bookings.length).toBeGreaterThanOrEqual(1);
    expect(isValidDate(body.bookings[0].bookingDates.checkin)).toBe(true);
    expect(isValidDate(body.bookings[0].bookingDates.checkout)).toBe(true);
  });

  test("Get all booking with details", async ({ request }) => {
    const response = await request.get("booking/", {
      headers: { cookie: `token=${cookies}` },
    });

    console.log(response);

    const body = await response.json();

    expect(body.bookings.length).toBeGreaterThanOrEqual(1);
    expect(body.bookings[0].bookingid).toBe(22);
    expect(body.bookings[0].roomid).toBe(1);
    expect(body.bookings[0].firstname).toBe("John");
    expect(body.bookings[0].lastname).toBe("Doe");
    expect(body.bookings[0].depositpaid).toBe(false);
    expect(isValidDate(body.bookings[0].bookingdates.checkin)).toBe(true);
    expect(isValidDate(body.bookings[0].bookingdates.checkout)).toBe(true);
  });

  test("Get booking by id with details", async ({ request }) => {
    const response = await request.get("booking/?roomid=1", {
      headers: { cookie: `token=${cookies}` },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.bookings[0].bookingid).toBe(22);
    expect(body.bookings[0].roomid).toBe(1);
    expect(body.bookings[0].firstname).toBe("John");
    expect(body.bookings[0].lastname).toBe("Doe");
    expect(body.bookings[0].depositpaid).toBe(false);
    expect(isValidDate(body.bookings[0].bookingdates.checkin)).toBe(true);
    expect(isValidDate(body.bookings[0].bookingdates.checkout)).toBe(true);
  });
});

export function isValidDate(date: string) {
  if (Date.parse(date)) {
    return true;
  } else {
    return false;
  }
}
