function AirQualityCurriculum() {
  return (
    <>
       <div style={{ padding: "1rem 0", fontFamily: "var(--font-sans)" }}>
        <p className="text-2xl">Air Quality Monitoring Curriculum</p>
        <table
          className="table table-bordered table-hover align-middle"
          style={{ fontSize: 14 }}
        >
          <thead>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              <th
                style={{
                  color: "var(--color-text-primary)",
                  fontWeight: 500,
                  whiteSpace: "nowrap"
                }}
              >
                Workshop session
              </th>
              <th style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
                Lesson
              </th>
              <th style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
                Activity
              </th>
              <th
                style={{
                  color: "var(--color-text-primary)",
                  fontWeight: 500,
                  textAlign: "center"
                }}
              >
                Learning objective
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: "var(--color-text-primary)" }}>
                1: Electricity &amp; Electronics
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                What is Electricity?
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                LED Breadboard Circuit
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  className="badge"
                  style={{ background: "#CECBF6", color: "#3C3489", fontWeight: 500 }}
                >
                  I
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ color: "var(--color-text-primary)" }}>
                2: Programming in Arduino
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Electronic Component Overview
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Breadboard Basics
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  className="badge"
                  style={{ background: "#CECBF6", color: "#3C3489", fontWeight: 500 }}
                >
                  I
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ color: "var(--color-text-primary)" }}>
                3: Communication Protocols
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                How Computers Talk
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Data Acquisition
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  className="badge"
                  style={{ background: "#9FE1CB", color: "#085041", fontWeight: 500 }}
                >
                  II
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ color: "var(--color-text-primary)" }}>
                4: Temperature &amp; Humidity Sensors
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Wiring-Diagram Review
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Component Testing
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  className="badge"
                  style={{ background: "#9FE1CB", color: "#085041", fontWeight: 500 }}
                >
                  II
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ color: "var(--color-text-primary)" }}>5: Air Quality</td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                PGH's Air Quality History
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Open Discussion
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  className="badge"
                  style={{ background: "#FAC775", color: "#633806", fontWeight: 500 }}
                >
                  III
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ color: "var(--color-text-primary)" }}>6: PM2.5 Sensor</td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Hazardous Particles
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Component Testing
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  className="badge"
                  style={{ background: "#9FE1CB", color: "#085041", fontWeight: 500 }}
                >
                  II
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ color: "var(--color-text-primary)" }}>
                7 &amp; 8: Full Board Assembly
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Soldering Review
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Soldering &amp; Assembly
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  className="badge"
                  style={{ background: "#9FE1CB", color: "#085041", fontWeight: 500 }}
                >
                  II
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ color: "var(--color-text-primary)" }}>
                9: Object Oriented Coding
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Objects in Coding
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                LED Breadboard Circuit
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  className="badge"
                  style={{ background: "#CECBF6", color: "#3C3489", fontWeight: 500 }}
                >
                  I
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ color: "var(--color-text-primary)" }}>
                10 &amp; 11 &amp;{" "}
                12: Wi-Fi Connectivity
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Wi-Fi Co-Processor Board
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Component Testing
              </td>
              <td
                style={{
                  textAlign: "center",
                  display: "flex",
                  gap: 4,
                  justifyContent: "center"
                }}
              >
                <span
                  className="badge"
                  style={{ background: "#CECBF6", color: "#3C3489", fontWeight: 500 }}
                >
                  I
                </span>
                <span
                  className="badge"
                  style={{ background: "#B5D4F4", color: "#0C447C", fontWeight: 500 }}
                >
                  IV
                </span>
              </td>
            </tr>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              <td style={{ color: "var(--color-text-primary)" }}>
                13 &amp;{" "}
                14: HTTP &amp; HTML
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Internet Protocols
              </td>
              <td style={{ color: "var(--color-text-secondary)" }}>
                Website Design &amp; Data Unification
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  className="badge"
                  style={{ background: "#B5D4F4", color: "#0C447C", fontWeight: 500 }}
                >
                  IV
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            fontSize: 13,
            color: "var(--color-text-secondary)",
            lineHeight: "1.8",
            marginTop: 8,
            padding: "0 2px"
          }}
        >
          <p
            style={{
              margin: "0 0 4px",
              fontWeight: 500,
              color: "var(--color-text-primary)"
            }}
          >
            Through the workshop's learning objectives, participants will be able
            to...
          </p>
          <div>
            <span
              style={{
                background: "#CECBF6",
                color: "#3C3489",
                fontSize: 11,
                fontWeight: 500,
                padding: "1px 6px",
                borderRadius: 4,
                marginRight: 6
              }}
            >
              I
            </span>
            Identify, build, and test the core components of a simple breadboard
            prototype through Arduino
          </div>
          <div>
            <span
              style={{
                background: "#9FE1CB",
                color: "#085041",
                fontSize: 11,
                fontWeight: 500,
                padding: "1px 6px",
                borderRadius: 4,
                marginRight: 6
              }}
            >
              II
            </span>
            Read wiring diagrams and apply traditional bus interface protocols to
            build a functional prototype
          </div>
          <div>
            <span
              style={{
                background: "#FAC775",
                color: "#633806",
                fontSize: 11,
                fontWeight: 500,
                padding: "1px 6px",
                borderRadius: 4,
                marginRight: 6
              }}
            >
              III
            </span>
            Reflect on Pittsburgh's air quality history to identify core themes across
            regional environmental justice efforts
          </div>
          <div>
            <span
              style={{
                background: "#B5D4F4",
                color: "#0C447C",
                fontSize: 11,
                fontWeight: 500,
                padding: "1px 6px",
                borderRadius: 4,
                marginRight: 6
              }}
            >
              IV
            </span>
            Describe and apply internet protocols to send data across electronic
            devices via Wi-Fi
          </div>
          <div
            style={{
              marginTop: 6,
              color: "var(--color-text-tertiary)",
              fontStyle: "italic"
            }}
          >
          </div>
        </div>
      </div>

    </>)
}

export default AirQualityCurriculum;