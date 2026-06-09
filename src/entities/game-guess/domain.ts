export type Player = {
    id: string;
    login: string | null;
    rating: number;
};

export type GameIdle = {
    id: string;
    players: Player[];
    status: "idle";
    field: string | null;
};

export type GameInProgress = {
    id: string;
    players: Player[];
    status: "inProgress";
    field: string | null;
};

export type GameFinished = {
    id: string;
    players: Player[];
    status: "gameOver";
    field: string | null;
};

export type Game = GameIdle | GameInProgress | GameFinished;