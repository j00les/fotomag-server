const { app } = require("../app");
const io = require("socket.io-client");
const { io: server } = require("../app");

jest.setTimeout(1000);
describe("run socket", () => {
  server.attach(3005);
  let socket;
  let socketCustomer;

  beforeAll((done) => {
    socket = io("http://localhost:3005");
    socketCustomer = io("http://localhost:3005");

    socket.on("connect", function () {
      console.log("worked...");
      done();
    });
    socket.on("disconnect", function () {
      console.log("disconnected...");
    });
  });

  afterAll((done) => {
    socket.disconnect();
    socketCustomer.disconnect();
    server.close();
    done();
  });

  describe("Socket Routes Test", () => {
    test("Socket join-room", (done) => {
      // jest.spyOn(socket, "join").mockResolvedValue("test");
      socket.emit("join-room", 1);
      // expect(socket.join).toHaveBeenCalled();
      socket.on("updateLocation", (id) => {
        console.log("CALEED <---------");
        try {
          expect(id).toBe(1);
          done();
        } catch (error) {
          done(error);
        }
      });
    });

    test("Socket location", (done) => {
      const data = {
        id: 1,
        data: "lokasi",
      };

      socket.emit("join-room", data.id);
      socketCustomer.emit("join-room", data.id);

      socket.on("updateLocation", (id) => {
        socketCustomer.on("updateLocation", (id) => {
          socket.emit("sendLocation", data);

          console.log("HEREEE");
          socketCustomer.on("updateLocation", (result) => {
            try {
              expect(result).toEqual(data.data);
              done();
            } catch (error) {
              done(error);
            }
          });
        });
      });
    });
  });
});
