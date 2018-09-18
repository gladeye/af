let inst = null;

function af(){
    if(!inst) inst = new AF();
    return inst;
}

class AF {
    _frame = null;
    _stopped = true;
    _oneRead = [];
    _oneWrite = [];
    _read = [];
    _write = [];

    constructor() {
        this._animate = this._animate.bind(this);
        if (typeof window !== 'undefined') this.start();
    }

    start() {
        if (!this._stopped) return;
        this._stopped = false;
        this._animate();
    }

    stop() {
        if (this._stopped) return;
        this._stopped = true;
        window.cancelAnimationFrame(this._frame);
    }

    _animate() {
        const { _oneWrite: oW, _oneRead: oR, _read: r, _write: w } = this;
        let i;

        // do one read, remove and trigger; then trigger loop reads
        while (oR.length) oR.shift()();
        for (i = 0; i < r.length; i++) r[i]();

        // do one write, remove and trigger; then trigger loop writes
        while (oW.length) oW.shift()();
        for (i = 0; i < w.length; i++) w[i]();

        this._frame = window.requestAnimationFrame(this._animate);
    }

    onNextRead(fn) {
        this._oneRead.push(fn);
    }

    onNextWrite(fn) {
        this._oneWrite.push(fn);
    }

    addRead(fn) {
        this._read.push(fn);
    }

    addWrite(fn) {
        this._write.push(fn);
    }

    removeRead(fn) {
        const { _read: r } = this, { length: l } = r;
        for (let i = 0; i < l; i++) if (r[i] === fn) r.splice(i, 1);
    }

    removeWrite(fn) {
        const { _write: w } = this, { length: l } = w;
        for (let i = 0; i < l; i++) if (w[i] === fn) w.splice(i, 1);
    }
}


export { AF, af };
