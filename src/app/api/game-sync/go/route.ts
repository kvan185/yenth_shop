import { NextRequest, NextResponse } from "next/server";

type GoRoom = {
  state: unknown;
  updated_at: string;
};

type GoClient = {
  send: (room: GoRoom) => void;
};

const globalStore = globalThis as typeof globalThis & {
  __goPrivateRooms?: Record<string, GoRoom>;
  __goPrivateRoomClients?: Record<string, Set<GoClient>>;
};

const rooms = globalStore.__goPrivateRooms ?? {};
const clients = globalStore.__goPrivateRoomClients ?? {};
globalStore.__goPrivateRooms = rooms;
globalStore.__goPrivateRoomClients = clients;

const getClients = (roomId: string) => {
  clients[roomId] ??= new Set<GoClient>();
  return clients[roomId];
};

export async function GET(request: NextRequest) {
  const roomId = request.nextUrl.searchParams.get("room") || "PRIVATE_GO_2_PLAYER";
  const stream = request.nextUrl.searchParams.get("stream");

  if (stream === "1") {
    const encoder = new TextEncoder();
    const body = new ReadableStream({
      start(controller) {
        const send = (room: GoRoom) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(room)}\n\n`));
        };
        const client = { send };

        getClients(roomId).add(client);
        if (rooms[roomId]) send(rooms[roomId]);

        request.signal.addEventListener("abort", () => {
          getClients(roomId).delete(client);
          controller.close();
        });
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  return NextResponse.json(rooms[roomId] || null);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const roomId = typeof body.room === "string" ? body.room : "PRIVATE_GO_2_PLAYER";
  const nextRoom = {
    state: body.state,
    updated_at: new Date().toISOString(),
  };

  rooms[roomId] = nextRoom;
  getClients(roomId).forEach((client) => client.send(nextRoom));
  return NextResponse.json(nextRoom);
}
