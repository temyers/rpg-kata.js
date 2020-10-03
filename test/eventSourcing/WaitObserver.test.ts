import { expect } from "chai";
import { createEvent } from "../../lib/eventSourcing/event";
import { NullLogger } from "../../lib/Logger";
import { WaitObserver, sleep } from "./WaitObserver";
const equal = require('fast-deep-equal/es6')

const logger = NullLogger()
describe("WaitObserver", function () {
  beforeEach(function () {
    this.waitObserver = givenAnObserver();
  });
  it("should fail if no events are received", async function () {
    await expect(this.waitObserver.wait()).to.eventually.be.rejected;
  });

  it("should fail if wrong events are received", async function () {
    const waiter: WaitObserver = this.waitObserver;
    const asyncWait = waiter.wait()
    waiter.onEvent(
      createEvent({
        type: "UnmatchingEvent",
        data: {},
        source: "WaitObserver.test",
      })
    );

    await expect(asyncWait).to.eventually.be.rejected;
  });

  it("should succeed if the required event is received", async function () {
    const waiter: WaitObserver = this.waitObserver;
    const asyncWait = waiter.wait()
    whenAMatchingEventIsReceived(waiter);

    await expect(asyncWait).to.eventually.be.fulfilled;
  });

  it("should reject if any part of the event does not match", async function () {
    const waiter: WaitObserver = this.waitObserver;
    const asyncWait = waiter.wait()

    waiter.onEvent(
      createEvent({
        type: "WaitObserverEvent",
        data: {},
        source: "ANonMatchingSource",
      })
    );

    await thenTheWaitShouldFail(asyncWait);
  });

  it("should fail if a matching event is not received within the required timeout", async function(){
    const waiter: WaitObserver = this.waitObserver;
    const asyncWait = waiter.wait()

    await sleep(30)

    whenAMatchingEventIsReceived(waiter)

    await thenTheWaitShouldFail(asyncWait);
  })
});

async function thenTheWaitShouldFail(asyncWait: Promise<void>) {
  await expect(asyncWait).to.eventually.be.rejected;
}

function whenAMatchingEventIsReceived(waiter: WaitObserver) {
  waiter.onEvent(
    createEvent({
      type: "WaitObserverEvent",
      data: {},
      source: "WaitObserver.test",
    })
  );
}

function givenAnObserver() {
  return new WaitObserver({
    timeout: 10,
    event: {
      type: "WaitObserverEvent",
      source: "WaitObserver.test",
      data: {},
    },
    logger,
  });
}


