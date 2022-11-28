
# **Red Team Assessment Scoring System (RTASS) 0.3.2**

> Red Team Assessment Scoring System
>
> Github: <https://github.com/JDArmy/RTASS>
>
> License: Apache
>
> Maintainer: Monyer, Collaborators: devils, makato, vf3ng
>
> Online Calculator <https://rtass.jd.army>

## **Introduction**

The Red Team Assessment Scoring System (RTASS) is an open framework used to assess the capability investment of both offensive and defensive sides in a single cyber red-blue confrontation or actual combat exercise, as well as the degree of risk faced by the business and the enterprise involved. Through RTASS, it is possible to quantify the risk status of attackers, defenders, business parties and enterprises in the red-blue adversarial network attack and defense drills. This framework is suitable for security assessment scenarios that conduct real network attacks on enterprises by simulating hacker APT methods, such as network red-blue confrontation drills, network actual offensive and defensive exercises, red team assessments, and blue army assessments.

> RTASS is founded, owned, and managed by the JD.Army team. JD.Army is a professional red team which focuses on excavating and solving the hidden security risks of enterprise safe operation. JD.Army reserves the right to update RTASS and this document regularly at its sole discretion. Although JD.Army owns all the rights and interests in RTASS, it permits the public to use it freely and follows the Apache open source agreement.

## **Background**

Years ago, companies often assessed their own security by simply using "penetration testing" to find vulnerabilities in individual application systems. To assess the criticality of vulnerabilities, the National Infrastructure Advisory Council (NIAC) developed a Common Vulnerability Assessment System, CVSS, hosted by the Forum for Incident Response and Security Teams (FIRST). Based on the previous version, FIRST has continued to iterate the v2 and v3 versions. The hazard assessment criteria for a single vulnerability are more and more accurate and perfect, and are also used by major security organizations and vulnerability recording platforms. With the development of network security, the threats to the network are increasing day by day. By simulating the APT attack methods and behaviors of hackers, the red-blue confrontation exercise method to carry out comprehensive security assessment on enterprises has been widely adopted. Some organizational units have also developed some scoring systems in order to evaluate between attackers and defenders. However, this scoring system can only measure the difference between the attacker and the attacker, and between the defender and the defender. In the case of only one attacking team and one defending team, the problem is even more prominent: if the core system is breached, does it mean that the attacking team is strong or the defending team is weak? If the core system is not broken, is the attacking team weak or the defending team strong? This is very difficult to measure, and there is no mature system for evaluation in the industry. Therefore, JD.Army has developed a red-blue confrontation scoring framework for the actual combat exercise scenario based on years of cyber offensive and defensive exercises and red-blue confrontation experience, referring to CVSS and OWASP risk rating methods.

## **Methods**

RTASS consists of two categories, "Confrontation Factors" and "Business Factors".

Confrontation FactorsMainly measure their respective strengths from the perspective of offense and defense, evaluate the lethality of key vulnerabilities in the penetration path, and finally combine business factors to form "offensive energy" and "defensive energy" scores.It consists of process factors and scores such as Offensive Strength, Defensive Strength, Vulnerability Risk.

- Offensive StrengthRefers to the highest level of attack technology used by the attacker on the key penetration path in a single red-blue confrontation exercise.
- Defensive StrengthRefers to the minimum level of defensive technology used by the defending team on the key penetration path in a single red-blue confrontation exercise.
- Vulnerability RiskRefers to the risk assessment of the most critical vulnerabilities on the critical penetration path of the drill in a single red-blue confrontation exercise.

Business FactorsIt mainly evaluates from the perspective of the impact on the enterprise, the level of business security capabilities, and the three elements of CIA information security, and finally combines the offensive and defensive factors to form the "business risk" and "enterprise risk" scores.It consists of process factors and scores such as Offensive Strength, Defensive Strength, Vulnerability Risk.

- Offensive StrengthRefers to the highest level of attack technology used by the attacker on the key penetration path in a single red-blue confrontation exercise.
- Defensive StrengthRefers to the minimum level of defensive technology used by the defending team on the key penetration path in a single red-blue confrontation exercise.
- Vulnerability RiskRefers to the risk assessment of the most critical vulnerabilities on the critical penetration path of the drill in a single red-blue confrontation exercise.

Why must it be "critical path" and "highest", "lowest", "largest" and "most critical"? 

This is because in a single red-blue confrontation, the attacker can adopt different strategies to form different attack paths, and use dozens or hundreds of different TTPs in the attack path. If these TTPs are measured in turn, it is obviously unrealistic and greatly increases the workload of the evaluation. 

Security follows the "short board principle" as well as the "long board principle" - the attacker does not need to ensure that every TTPs investment is the highest technical ability, as long as there are one or several attacks on the critical path High-level attacks may take down corporate targets. So we take the highest level of attack attackers invest in the critical path as a measure of their offensive prowess. 

Obviously, we can also see that the strength of the attacker does not represent the total effective technical investment of the attacker in a single red-blue confrontation exercise. Let's take physics as an analogy: the maximum force a person exerts on an object does not represent the effective work the person does on the object. Therefore, in order to measure the "work" of the attacker, we introduce the concept of "offensive energy" to represent the total effective investment of the attacker in a single red-blue confrontation exercise, that is, the technical level of the attacker in this exercise. 

RTASS uses the evaluation factor to form 6 process scores, and the process scores are combined in different ways to form four different roles for the attacker, defender, business, and enterprise. Item final score: Offensive Energy, Defensive Energy, Business Risk, Enterprise Risk. These 4 items refer to the situation in a single exercise, so in different exercises, the score may be different. The scoring methods and factors will be described in detail below.

### **Offensive Energy[OE, Offensive Energy]**

Offensive Energy[OE] is calculated from 3 process scores such as Offensive Strength[OS], Defensive Strength[DS], Enterprise Impact[EI], It is the effective output of the attacker in a single exercise, which can represent the level of the attacker in this exercise.

> Offensive Energy: OE = ( OS * 1 + DS * 1 + EI * 1 )/3

The offensive strength represents the highest level of the attacker's attack output in this red-blue confrontation. But other factor scores are needed to correct it: if a very advanced technique is used, it takes a lot of effort, but no effect is achieved, then it is equivalent to doing useless work in this exercise, which means that the offensive energy is very low.The introduction of the "defensive strength" factor is to correct the effective display of the "offensive strength" in terms of ability. Generally speaking, the stronger the defense is, the stronger the attack is on the premise of achieving the same goal; on the contrary, if the defender is weaker, the attacker can usually have less investment in order to achieve the goal. Offensive energy is not so great."Enterprise Impact" is a measure of the effectiveness of an attacker's "work done". The more enterprise risks exposed in a single exercise, the stronger the attacker's energy; the less enterprise risks exposed in countermeasures, the lower the attacker's energy in the exercise.

### **Defensive Energy[DE, Defensive Energy]**

Defensive Energy[DE] is calculated from 3 process scores such as Defensive Strength[DS], Vulnerability Risk[VR], Enterprise Impact[EI], It is the effective output of the defender in a single exercise, and can represent the level of the defender in this exercise.

> Defensive Energy: DE = ( DS * 1 + ( 10 - VR ) * 1 + ( 10 - EI ) * 1 )/3

The defensive strength is generally the lower level of the defender's defensive ability output in this red-blue confrontation. But you can't simply think that "defensive strength" is the embodiment of defensive energy. Because no matter how strong the defense is, if the target is finally taken by the attacker, it still shows that the defense ability is low.The introduction of vulnerability risk is to correct the effective display of "defensive strength" in ability, which is negatively correlated with defensive energy. The higher the vulnerability risk, the lower the defensive energy. Even if the defensive strength is very strong, but a serious vulnerability risk is exposed on the critical path of the offense, it means that the defensive strength has not been fulfilled, and points should be deducted.Corporate influence is negatively correlated with defensive energy, the greater the corporate influence, the lower the defensive energy. Even if the defense is strong and the loopholes are small, it can still have a significant impact on the enterprise, indicating that the effective energy generated by the defense is not enough, and points should be deducted.

### **Business Risk[BR, Business Risk]**

Business Risk[BR] is calculated from 3 process scores such as Technical Impact[TI], Enterprise Impact[EI], Business Strength[BS], It refers to the risk level of business exposure in terms of security, which can represent the security level of the participating business parties in this exercise.

> Business Risk: BR = ( TI * 1 + EI * 1 + ( 10 - BS ) * 1 )/3

The technical impact is mainly measured from the three elements of security: confidentiality, integrity and availability. The greater the technical impact of the business, the higher the risk of the business.Enterprise impact is closely related to business risks. If it can bring a greater impact on the enterprise, whether it is economic loss, loss of goodwill or compliance impact, it will affect the development of the enterprise to a large extent, and then affect the development of the business.Business strength is mainly reflected in the implementation of SDL or DevSecOps. If there is a problem, it will bring great obstacles to the promotion of security and the elimination of risks, which will cause major risks to the business. Therefore, business strength is negatively correlated with business risk score, and the lower the strength, the greater the risk.

### **Enterprise Risk[ER, Enterprise Risk]**

Enterprise Risk[ER] is calculated from 3 process scores such as Defensive Strength[DS], Vulnerability Risk[VR], Enterprise Impact[EI], It refers to the degree of risk exposed by the enterprise in terms of security, which can represent the security level of the enterprise as a whole in this exercise.

> Enterprise Risk: ER = ( ( 10 - DS ) * 1 + VR * 1 + EI * 1 )/3

Defensive strength is negatively correlated with corporate risk. If an enterprise does not invest much in security construction, it will generally directly affect its protection capability, detection capability and response capability, that is, its defensive strength. On the other hand, if the defensive strength of the enterprise is weak, it means that the enterprise is facing problems in safety construction or defensive team building, which will make the enterprise face more risks.If the key vulnerabilities on the penetration path are very easy to be discovered, exploited, and have great lethality, it generally means that the defense has a relatively large problem in the daily security operations, SDL or DevSecOps security process landing, and the risk of the enterprise Sex will increase.The "corporate impact" is more related to the normal operation, revenue and even life and death of the company, so it is related to corporate risks.

The above associations may change with the evolution of RTASS.

In this scoring framework, each scoring factor has a total of 5 scoring items from 0 to 4. The process score and final score: the lowest score is 0 points, and the highest score is 10 points. Among them, the distribution of the corresponding grades for each score is as follows:

| Score        | Level   |
| ------------ | ------- |
| 0.00         | None    |
| 0.01 - 3.99  | Low     |
| 4.00 - 6.99  | Medium  |
| 7.00 - 8.99  | High    |
| 9.00 - 10.00 | Extreme |

> Note: Some scoring factors in this framework, such as "vulnerability risk" and "enterprise impact", refer to the relevant factors in the OWASP risk rating method.

## **Score Factor**

### **Confrontation Factors**

Confrontation Factors consists of 3 parts, such as Offensive Strength, Defensive Strength, Vulnerability Risk.

#### **Offensive Strength[OS]**

Offensive Strength is calculated from 4 factor scores such as Offensive Level[OL], Offensive Difficulty[OD], Target Reach[TR], Anti-traceability Level[AL]. The calculation algorithm is: 

> Offensive Strength[OS] = ( OL * 1 * 2.5 + OD * 1 * 2.5 + TR * 1 * 2.5 + AL * 1 * 2.5 )/4

##### **Offensive Level[OL]**

Offensive Level mainly used for evaluate when The highest level of skill used by the attacker in the evaluation path.

- 0 - equivalent to entry-level hacker
- 1 - Equivalent to a normal level hacker or a tool, script hacker
- 2 - equivalent to a hacker proficient in penetration techniques
- 3 - Requires more professional teamwork
- 4 - Equivalent to National APT Hacking Team

##### **Offensive Difficulty[OD]**

Offensive Difficulty mainly used for evaluate when The highest difficulty the attacker has to solve the puzzle in the entire evaluation path.

- 0 - almost no difficulty for professional hackers
- 1 - a bit difficult for professional hackers
- 2 - more difficult for professional hackers
- 3 - difficult for professional hackers
- 4 - Almost impossible for professional hackers

##### **Target Reach[TR]**

Target Reach mainly used for evaluate when Whether the attacker achieved the intended goal

- 0 - basically not achieved
- 1 - small amount achieved
- 2 - medium volume reached
- 3 - Mass Achievement
- 4 - Fully Achieved

##### **Anti-traceability Level[AL]**

Anti-traceability Level mainly used for evaluate when What is the attacker's ability to trace back to the source?

- 0 - The attacker's real identity information is traced to the source, or the attacking asset or computer is reversely controlled
- 1 - The attacker's virtual identity feature or the real IP in the territory is traced
- 2 - The attacker's persistent attack behavior is marked by fingerprints, or a large number of indicators of attack (IOAs) are marked by records (honeypots, etc.)
- 3 - The attacker's fixed C2 server IP or fixed tunnel return IP is traced back to the source
- 4 - hardly any useful information can be traced back to the source

#### **Defensive Strength[DS]**

Defensive Strength is calculated from 4 factor scores such as Prevention Level[PL], Detection Level[DL], Response Level[RL], Traceability Level[TL]. The calculation algorithm is: 

> Defensive Strength[DS] = ( PL * 1 * 2.5 + DL * 1 * 2.5 + RL * 1 * 2.5 + TL * 1 * 2.5 )/4

##### **Prevention Level[PL]**

Prevention Level mainly used for evaluate when A defender's ability to block critical penetration paths.

- 0 - almost no interception
- 1 - slight interception
- 2 - stronger interception
- 3 - very strong interception
- 4 - almost hard to break

##### **Detection Level[DL]**

Detection Level mainly used for evaluate when Defender's cyber threat discovery capabilities for critical penetration paths.

- 0 - almost no threat detected
- 1 - Threat of sporadic attack on non-critical assets detected
- 2 - few critical path threats detected
- 3 - Significant critical path threats detected
- 4 - Nearly all threats detected

##### **Response Level[RL]**

Response Level mainly used for evaluate when Defender's ability to recover, repair, and respond to a compromised system.

- 0 - almost difficult to advance (3+ days)
- 1 - slow response (12+ hours)
- 2 - The response is more timely (within 12 hours)
- 3 - Response near real time (within 2 hours)
- 4 - Real-time response (within 30 minutes)

##### **Traceability Level[TL]**

Traceability Level mainly used for evaluate when Whether the defender can effectively trace the source of the attacker.

- 0 - hardly any useful information can be traced back to the source
- 1 - The attacker's fixed C2 server IP or fixed tunnel back-up IP is traced back to the source
- 2 - The attacker's persistent attack behavior is marked by fingerprints, or a large number of indicators of attack (IOAs) are marked by records (honeypots, etc.)
- 3 - The attacker's virtual identity feature or the real IP in the territory is traced
- 4 - The attacker's real identity information is traced, or the attacked assets or computers are reversely controlled

#### **Vulnerability Risk[VR]**

Vulnerability Risk is calculated from 4 factor scores such as Vulnerability Discoverability[VD], Vulnerability Exploitability[VE], Vulnerability Lethality[VL], Vulnerability Disclosure Window[VDW]. The calculation algorithm is: 

> Vulnerability Risk[VR] = ( VD * 1 * 2.5 + VE * 1 * 2.5 + VL * 1 * 2.5 + VDW * 1 * 2.5 )/4

##### **Vulnerability Discoverability[VD]**

Vulnerability Discoverability mainly used for evaluate when Discoverability of critical vulnerabilities in the penetration path.

- 0 - almost impossible to find
- 1 - harder to spot for professional hackers
- 2 - Medium difficulty to find for professional hackers
- 3 - For professional hackers, discovery is easier
- 4 - Discovery with common automation tools

##### **Vulnerability Exploitability[VE]**

Vulnerability Exploitability mainly used for evaluate when Exploitability of critical vulnerabilities in the penetration path.

- 0 - almost impossible to exploit
- 1 - Difficult to exploit for professional hackers
- 2 - Moderately difficult to exploit for professional hackers
- 3 - easier to exploit for professional hackers
- 4 - Can be exploited using common automation tools

##### **Vulnerability Lethality[VL]**

Vulnerability Lethality mainly used for evaluate when Maximum lethality for critical vulnerabilities in the penetration path.

- 0 - almost no harm
- 1 - lower lethality, affects individual non-core assets
- 2 - medium-scale lethality, affecting a subset of non-core assets
- 3 - Massive lethality, affecting individual core assets
- 4 - Extremely broad lethality, affecting a subset of core assets

##### **Vulnerability Disclosure Window[VDW]**

Vulnerability Disclosure Window mainly used for evaluate when The maximum exposure time window for critical vulnerabilities in the penetration path.

- 0 - little public disclosure
- 1 - Small-scale private dissemination of hacker circles
- 2 - Public disclosure less than 3 days
- 3 - public disclosure greater than 3 days
- 4 - Public disclosure greater than 1 week

### **Business Factors**

Business Factors consists of 3 parts, such as Technical Impact, Enterprise Impact, Business Strength.

#### **Technical Impact[TI]**

Technical Impact is calculated from 3 factor scores such as Loss of Confidentiality[LC], Loss of Integrity[LI], Loss of Availability[LA]. The calculation algorithm is: 

> Technical Impact[TI] = ( LC * 1 * 2.5 + LI * 1 * 2.5 + LA * 1 * 2.5 )/3

##### **Loss of Confidentiality[LC]**

Loss of Confidentiality mainly used for evaluate when How much data can be leaked and how sensitive it is.

- 0 - cannot cause data leakage
- 1 - can leak a small amount of non-sensitive data
- 2 - can leak large amounts of non-sensitive data
- 3 - A small amount of sensitive data can be leaked
- 4 - Can reveal large amounts of sensitive data

##### **Loss of Integrity[LI]**

Loss of Integrity mainly used for evaluate when How much data might be damaged and how much.

- 0 - no data corruption
- 1 - can corrupt a small amount of non-core data
- 2 - can corrupt a lot of non-core data
- 3 - can corrupt a small amount of core data
- 4 - can corrupt a lot of core data

##### **Loss of Availability[LA]**

Loss of Availability mainly used for evaluate when How much service can be lost and how important it is.

- 0 - no business interruption
- 1 - Can cause a small amount of non-core business disruption to the business
- 2 - Can cause substantial disruption to the non-core business of the enterprise
- 3 - Can cause a small amount of disruption to the company's core business
- 4 - Can cause substantial disruption to the company's core business

#### **Enterprise Impact[EI]**

Enterprise Impact is calculated from 3 factor scores such as Financial Damage[FD], Reputation Damage[RD], Compliance Impact[CI]. The calculation algorithm is: 

> Enterprise Impact[EI] = ( FD * 1 * 2.5 + RD * 1 * 2.5 + CI * 1 * 2.5 )/3

##### **Financial Damage[FD]**

Financial Damage mainly used for evaluate when the greatest impact on the business economy.

- 0 - less than the cost of fixing the bug
- 1 - will not have a significant impact on the company's annual profit
- 2 - Can affect a certain company's annual profit
- 3 - Significant impact on the company's annual profit
- 4 - Significant impact on the company's annual profit

##### **Reputation Damage[RD]**

Reputation Damage mainly used for evaluate when Whether it will cause damage to the company's reputation and thus damage the business.

- 0 - no loss of goodwill
- 1 - May cause slight damage to goodwill
- 2 - Can cause serious damage to goodwill
- 3 - Can lead to large or large customer churn
- 4 - Can cause significant brand damage

##### **Compliance Impact[CI]**

Compliance Impact mainly used for evaluate when How much breach risk arises from a problem that arises or a malicious action by an attacker.

- 0 - no risk of violation
- 1 - can create a slight risk of non-compliance
- 2 - Can cause a more obvious risk of violation
- 3 - Can create a very high profile breach risk
- 4 - Serious Violation or Contribution to Violation

#### **Business Strength[BS]**

Business Strength is calculated from 3 factor scores such as Development Life Circle[DLC], Operation Life Circle[OLC], Employment Security Awareness[ESA]. The calculation algorithm is: 

> Business Strength[BS] = ( DLC * 1 * 2.5 + OLC * 1 * 2.5 + ESA * 1 * 2.5 )/3

##### **Development Life Circle[DLC]**

Development Life Circle mainly used for evaluate when Whether there are security issues identified in the software development life cycle.

- 0 - almost no security concerns
- 1 - There are a lot of security process issues
- 2 - has a moderate amount of security process issues
- 3 - There are minor security process issues
- 4 - basically no security process issues

##### **Operation Life Circle[OLC]**

Operation Life Circle mainly used for evaluate when Whether there are security issues found in the operation and maintenance life cycle.

- 0 - almost no security concerns
- 1 - There are a lot of security process issues
- 2 - has a moderate amount of security process issues
- 3 - There are minor security process issues
- 4 - basically no security process issues

##### **Employment Security Awareness[ESA]**

Employment Security Awareness mainly used for evaluate when Whether the majority of employees have security awareness issues during the assessment process.

- 0 - almost no security awareness
- 1 - Most of the employees in key positions have weak safety awareness
- 2 - A small number of employees in key positions have weak safety awareness
- 3 - Most of the employees in key positions have high safety awareness
- 4 - All staff have high safety awareness

## **Score Ability**

In order to be able to measure the scoring factor in more detail, RTASS developed the Plus version on the basis of the Base version, adding a more refined "ability factor" to the scoring factor. With the capability factor, RTASS can not only make a macro evaluation of the attackers, defenders, business parties and enterprises, but also indicate the strengths and weaknesses of their capability points and the direction that needs to be further improved in a more detailed manner. As of now, the following scoring factors have capability options:

### **Offensive Level[OL]**

Offensive Level consists of 8 parts, such as Intelligence Reconnaissance Capability[IRC], Weaponization Capability[WC], Vulnerability Mining and Exploitation Capability[VMEC], Anti Threat Detection Capability[ATDC], Social Engineering Capability[SEC], Permission Persistence Capability[PPC], Tunnel Construction Capability[TCC], Lateral Movement Capability[LMC]. The calculation algorithm is: 

> Offensive Level[OL] = ( IRC * 1 + WC * 1 + VMEC * 1 + ATDC * 1 + SEC * 1 + PPC * 1 + TCC * 1 + LMC * 1 )/8



##### **Intelligence Reconnaissance Capability[IRC]**

Intelligence Reconnaissance Capability mainly used for evaluate when The attacker's capabilities in the information gathering, intelligence reconnaissance phase

- 0 - Could not obtain valid intelligence information
- 1 - Basic IT asset and network information collection capabilities
- 2 - Strong asset collection ability, able to find remote and vulnerable assets; strong organizational personnel reconnaissance ability, able to find key social work targets
- 3 - Ability to fully grasp the intelligence of the target organization, operations, collaboration, personnel, assets, security, network architecture, etc. through active and passive means, and formulate targeted attack plans
- 4 - Under the premise that the target is not aware of the target, it can grasp the overall picture of the online and offline operations of the target enterprise and the details of the target, accurately draw the attack path, and quickly and accurately find the stronghold establishment plan

##### **Weaponization Capability[WC]**

Weaponization Capability mainly used for evaluate when Attacker capabilities during the weaponization, resource development phase

- 0 - no programming or programming ability
- 1 - Ability to write simple script EXP
- 2 - Ability to write more complex penetration tools
- 3 - Able to develop C2, automated penetration platform
- 4 - Ability to design and implement advanced complex nuclear bomb-level weapons (eg Stuxnet, Bvp47, Wannacry, etc.)

##### **Vulnerability Mining and Exploitation Capability[VMEC]**

Vulnerability Mining and Exploitation Capability mainly used for evaluate when Attacker's black and white box vulnerability mining ability and actual combat vulnerability exploitation ability

- 0 - Unable to find valuable exploits or exploited exploits successfully
- 1 - Able to exploit general vulnerabilities in applications and exploit them successfully
- 2 - Ability to mine and exploit highly complex vulnerabilities in applications
- 3 - Ability to mine common component or middleware vulnerabilities and exploit them successfully
- 4 - Ability to mine operating system and common system component-level vulnerabilities and exploit them successfully

##### **Anti Threat Detection Capability[ATDC]**

Anti Threat Detection Capability mainly used for evaluate when Attacker's ability to bypass WAFs, firewalls, antivirus, and threat detection devices

- 0 - Little means or ability to counter threat detection systems
- 1 - Able to bypass WAF, NGFW and other defenses to achieve vulnerability exploitation
- 2 - It can bypass anti-virus, HIDPS and other defense methods to achieve C2 online without alarm
- 3 - Low threat perception during RBI and intranet lateral movement
- 4 - In the case of extremely strong defensive strength, non-perceptual, long-term, and stable target action can be achieved after target breakthrough

##### **Social Engineering Capability[SEC]**

Social Engineering Capability mainly used for evaluate when The attacker's social engineering capabilities on the network or on the ground and the success rate

- 0 - cannot implement successful social work
- 1 - Successful social worker with access to general staff
- 2 - Successful social work and access to security awareness trained non-security practitioners
- 3 - Successful social work and authorization for those who are engaged in security positions
- 4 - Able to successfully social work and gain access to the most professional security engineers

##### **Permission Persistence Capability[PPC]**

Permission Persistence Capability mainly used for evaluate when The attacker's ability to maintain permissions on the foothold after gaining initial access

- 0 - Unable to maintain stability and continuity of stronghold authority
- 1 - Enables long-term stable execution of basic orders at the base
- 2 - Invisible permission maintenance in case of reboot
- 3 - Ability to execute more commands without perceptually elevating the base's privileges
- 4 - Privilege Sustainability After Emergency Response

##### **Tunnel Construction Capability[TCC]**

Tunnel Construction Capability mainly used for evaluate when Attacker's ability to build tunnels after gaining initial access

- 0 - Unable to build a smooth and stable tunnel
- 1 - Able to build a simple springboard to achieve C2 online and intranet roaming
- 2 - Ability to build multi-level springboard tunnels according to the needs of the environment
- 3 - Ability to hide springboard traffic into normal network traffic to achieve threat insensitivity
- 4 - On the basis of the former, it can penetrate the target multi-layer intranet and use a variety of different protocols to build long-term and stable tunnel links

##### **Lateral Movement Capability[LMC]**

Lateral Movement Capability mainly used for evaluate when After gaining initial access, the attacker gains more permissions and expands the network expansion capabilities of the results

- 0 - The base is the end point, no continuous network expansion capability
- 1 - The identity and location of the base can be confirmed through information collection, and useful intelligence information can be obtained
- 2 - On the basis of the former, it can conduct non-perceptual intranet spying, find a lateral movement path or target to move
- 3 - On the basis of the former, access credentials can be obtained and the credentials can be successfully used for lateral movement
- 4 - On the basis of the former, non-perceptual lateral movement is realized through various complex technical means such as puddles, social work, and supply chains.

### **Target Reach[TR]**

Target Reach consists of 3 parts, such as Goal Achievement Time[GAT], Goal Achievement Cost[GAC], Goal Action Ability[GAA]. The calculation algorithm is: 

> Target Reach[TR] = ( GAT * 1 + GAC * 1 + GAA * 1 )/3



##### **Goal Achievement Time[GAT]**

Goal Achievement Time mainly used for evaluate when The minimum time to achieve breakthrough control of the target by an attacker.

- 0 - The breakout control of the target system has not been completed within the set time
- 1 - The target breakthrough was not completed within the set time, but the breakthrough control of multiple core systems
- 2 - Complete the breakthrough control of some targets within the set time
- 3 - Complete the main core target breakthrough control within 1-3 weeks
- 4 - Complete the main core target breakthrough control within 1-3 days

##### **Goal Achievement Cost[GAC]**

Goal Achievement Cost mainly used for evaluate when The work cost of weapons, manpower, vulnerabilities, etc. that the attacker needs to pay in order to achieve the goal

- 0 - Severely making ends meet
- 1 - great cost (nuclear 0day, etc.)
- 2 - Larger cost (generic 0day, etc.)
- 3 - lower cost
- 4 - almost no cost

##### **Goal Action Ability[GAA]**

Goal Action Ability mainly used for evaluate when The attacker's ability to maximize the ability to achieve the ultimate goal after gaining access to the target

- 0 - Unable to achieve target action on target
- 1 - Partial data leakage to target can be achieved
- 2 - A partial operational impact on the target can be achieved
- 3 - Full data leakage to the target can be achieved
- 4 - Full data exfiltration can be accomplished without perception, or with long-term lasting effects

### **Prevention Level[PL]**

Prevention Level consists of 7 parts, such as Information Event Management Capability[IEMC], Software Update Management Capability[SUMC], Threat Identification Blocking Capability[TIBC], Baseline Security Management Capabilities[BSMC], Account Security Management Capabilities[ASMC], Privilege Security Management Capability[PSMC], Network Access Control Capability[NACC]. The calculation algorithm is: 

> Prevention Level[PL] = ( IEMC * 1 + SUMC * 1 + TIBC * 1 + BSMC * 1 + ASMC * 1 + PSMC * 1 + NACC * 1 )/7



##### **Information Event Management Capability[IEMC]**

Information Event Management Capability mainly used for evaluate when Defender's ability to manage various logs and events

- 0 - The implementation of log management specifications is not in place, and a large number of logs are missing
- 1 - Decentralized logging and event tracing capabilities
- 2 - There is a centralized security log and event management system
- 3 - Ability to classify and summarize log events, identify, rate and alert on threats
- 4 - Comprehensive and systematic log incident response and automated security operations capabilities

##### **Software Update Management Capability[SUMC]**

Software Update Management Capability mainly used for evaluate when The defender's vulnerability management capabilities for various software, systems, components, and dependencies.

- 0 - No software update management capabilities, with a large number of long-term critical vulnerabilities
- 1 - Timely security updates can be made to the operating system patches of production servers
- 2 - On the basis of the former, the software commonly used in development, operation and maintenance, and employee office terminal software can be managed in a unified manner and updated safely in a timely manner
- 3 - On the basis of the former, version management and timely security updates can be performed on the system, container service programs, and middleware
- 4 - On the basis of the former, version management and timely security updates can be performed on the components that the application relies on and references

##### **Threat Identification Blocking Capability[TIBC]**

Threat Identification Blocking Capability mainly used for evaluate when Ability to identify and block threats on internal and external networks and terminals.

- 0 - No threat identification blocking facility
- 1 - There are border traffic protection and blocking facilities
- 2 - On the basis of the former, there are internal traffic protection and blocking facilities
- 3 - On the basis of the former, there are endpoint protection and blocking facilities
- 4 - On the basis of the former, there are security orchestration and automated response facilities

##### **Baseline Security Management Capabilities[BSMC]**

Baseline Security Management Capabilities mainly used for evaluate when The defender's baseline security management capability for various systems and applications.

- 0 - No baseline security management capability
- 1 - With service security configuration and audit log baseline management
- 2 - Based on the former, there is access control baseline management
- 3 - On the basis of the former, there are account permissions and authentication authorization baseline management
- 4 - On the basis of the former, there are security testing and evaluation processes for services, networks, and supply chains

##### **Account Security Management Capabilities[ASMC]**

Account Security Management Capabilities mainly used for evaluate when Defenders have unified management of various accounts and dynamic threat identification capabilities.

- 0 - no unified identity management capability
- 1 - Unified account management and authentication
- 2 - More secure authentication techniques (go password or MFA etc.)
- 3 - Unified Identity Management Based on Trusted Devices
- 4 - Dynamic Adaptive and Continuous Authentication

##### **Privilege Security Management Capability[PSMC]**

Privilege Security Management Capability mainly used for evaluate when Defenders have unified access and dynamic management and control capabilities for various accounts.

- 0 - no authority unified management capability
- 1 - Unified functional granularity rights management (authorization, authentication, etc.)
- 2 - Ongoing Evaluation and Online Governance of Privilege Minimization
- 3 - Unified data granularity rights management
- 4 - Continuous Evaluation and Dynamic Control of Privilege Abuse Prevention

##### **Network Access Control Capability[NACC]**

Network Access Control Capability mainly used for evaluate when Access control and granularity between networks and terminals inside and outside the enterprise.

- 0 - the network does not perform any access control
- 1 - The office network is isolated from the production network and accessed through the bastion machine
- 2 - On the basis of the former, there is network isolation between external customer service and internal employee service
- 3 - On the basis of the former, there is network isolation between different application services
- 4 - On the basis of the former, there are more fine-grained micro-isolation capabilities

### **Detection Level[DL]**

Detection Level consists of 8 parts, such as External Threat Traffic Awareness[ETTA], External Harpoon Attack Awareness[EHAA], Proximity Penetration Attack Awareness[PPAA], Intranet Threat Traffic Awareness[ITTA], Endpoint Malware Awareness[EMA], Endpoint Abnormal Behavior Awareness[EABA], Threat Detection Rate[TDR], Threat Identification Timeliness Rate[TITR]. The calculation algorithm is: 

> Detection Level[DL] = ( ETTA * 1 + EHAA * 1 + PPAA * 1 + ITTA * 1 + EMA * 1 + EABA * 1 + TDR * 1 + TITR * 1 )/8



##### **External Threat Traffic Awareness[ETTA]**

External Threat Traffic Awareness mainly used for evaluate when Threat traffic awareness of an enterprise when it is attacked by an external network.

- 0 - almost no perception
- 1 - has a small amount of perception
- 2 - has moderate perception
- 3 - has a lot of perception
- 4 - almost all perception

##### **External Harpoon Attack Awareness[EHAA]**

External Harpoon Attack Awareness mainly used for evaluate when Threat perception and handling capabilities of an enterprise when it is attacked by an external spear.

- 0 - no perception
- 1 - Perceives an attack event and is able to capture attack samples
- 2 - On the basis of the former, it is possible to trace out all the fished persons and alert them
- 3 - On the basis of the former, it is possible to sense that employees are recruited by phishing, extract terminal samples, and restore the attack method
- 4 - On the basis of the former, the landing, execution and online actions of the fishing Trojan can be quickly sensed, and can be blocked in time

##### **Proximity Penetration Attack Awareness[PPAA]**

Proximity Penetration Attack Awareness mainly used for evaluate when The ability of enterprises to perceive and deal with threats when they are subjected to near-source on-the-spot attacks and physical penetration.

- 0 - almost no perception
- 1 - After a successful attack, determine the path of the near-source penetration attack through source tracing.
- 2 - Successfully found traces of near-source penetration through technical monitoring and administrative means, including but not limited to collecting U disks, capturing HID attacks, wifi blasting, etc.
- 3 - On the basis of the former, it can analyze in detail the attack methods and attack processes used by the attackers, including but not limited to the analysis of attack methods against wifi and the analysis of Trojan horses
- 4 - On the basis of the former, it has independent near-source perception capabilities to quickly detect near-source attacks and block them in time.

##### **Intranet Threat Traffic Awareness[ITTA]**

Intranet Threat Traffic Awareness mainly used for evaluate when Threat-traffic awareness of an enterprise under attack from the inside.

- 0 - almost no perception
- 1 - Can perceive indiscriminate full intranet scanning behavior, identify abnormal points and quickly locate the scanning source IP
- 2 - Based on traffic characteristics, small-scale intranet scans such as C segment can be captured, and the target and purpose can be restored.
- 3 - On the basis of the former, perception of partial credential exploitation and lateral movement behavior, or data exfiltration behavior
- 4 - Perception of almost the entire attack process, and the encrypted C2 channel used by the attacker

##### **Endpoint Malware Awareness[EMA]**

Endpoint Malware Awareness mainly used for evaluate when The threat perception capability of enterprise personal office computers, servers and other terminal devices when they are attacked by malware.

- 0 - almost no perception
- 1 - There is a smooth feedback channel for employee security issues, and terminal attacks are quickly detected
- 2 - Ability to sense endpoint attacks through endpoint detection responses, threat traffic analysis
- 3 - Capable of capturing attack samples, extracting effective network or host IOC and implementing monitoring and blocking capability deployment
- 4 - Complete automated sandbox analysis, threat identification intelligence and strategies, security orchestration and automated threat handling mechanisms

##### **Endpoint Abnormal Behavior Awareness[EABA]**

Endpoint Abnormal Behavior Awareness mainly used for evaluate when The threat perception ability of enterprise personal office computers, servers and other terminal equipment to dangerous operations and abnormal behaviors.

- 0 - almost no perception
- 1 - Able to perceive large-scale network scanning behavior for this machine and alert
- 2 - Able to perceive the network password blasting behavior against this machine and give an alarm
- 3 - On the basis of the former, it can perceive the abnormal operation behavior of privileged accounts, sensitive files and processes on the terminal
- 4 - On the basis of the former, it can perceive abnormal remote access behavior between terminals

##### **Threat Detection Rate[TDR]**

Threat Detection Rate mainly used for evaluate when The coverage rate of high-risk threats actually identified by the defender through manual or other means after the system detects the threat.

- 0 - no threat detected (within 12 hours)
- 1 - detection rate: 0 < N <= 25%
- 2 - Detection rate: 25% < N <= 50%
- 3 - Detection rate: 50% < N <= 80%
- 4 - Detection rate: 80% < N <= 100%

##### **Threat Identification Timeliness Rate[TITR]**

Threat Identification Timeliness Rate mainly used for evaluate when The timely rate of high-risk threats actually identified by the defender through manual or other means after the system detects the threat.

- 0 - Threat not identified in time (within 12 hours)
- 1 - Timely rate: 0 < N <= 25%
- 2 - Timeliness: 25% < N <= 50%
- 3 - Timeliness: 50% < N <= 80%
- 4 - Timeliness: 80% < N <= 100%

### **Response Level[RL]**

Response Level consists of 3 parts, such as Threat Handling Capability[THC], Threat Disposal Timely Rate[TDTR], Threat Analysis Capability[TAC]. The calculation algorithm is: 

> Response Level[RL] = ( THC * 1 + TDTR * 1 + TAC * 1 )/3



##### **Threat Handling Capability[THC]**

Threat Handling Capability mainly used for evaluate when Threat disposition coverage by defenders after a threat is detected.

- 0 - No action taken (within 12 hours)
- 1 - Disposal rate: 0 < N <= 25%
- 2 - Disposal rate: 25% < N <= 50%
- 3 - Disposal rate: 50% < N <= 80%
- 4 - Disposal rate: 80% < N <= 100%

##### **Threat Disposal Timely Rate[TDTR]**

Threat Disposal Timely Rate mainly used for evaluate when The defender's timely threat resolution rate after a threat is detected.

- 0 - No timely disposal (within 12 hours)
- 1 - Timely rate: 0 < N <= 25%
- 2 - Timeliness: 25% < N <= 50%
- 3 - Timeliness: 50% < N <= 80%
- 4 - Timeliness: 80% < N <= 100%

##### **Threat Analysis Capability[TAC]**

Threat Analysis Capability mainly used for evaluate when Defender's ability to identify, analyze, and reverse threats

- 0 - no threat analysis capability
- 1 - Ability to accurately identify threats and extract valid IOCs
- 2 - Has automated threat analysis and intelligence sharing mechanisms
- 3 - Able to perform complex threat analysis, restore attack methods and targets
- 4 - With automated threat analysis technology and professional reverse analysis capabilities, a complete analysis report can be formed

### **Traceability Level[TL]**

Traceability Level consists of 3 parts, such as Intrusion Path Traceability Capability[IPTC], Attacker Traceability and Countermeasure Capability[ATCC], Deception and Entrapment Capabilities[DEC]. The calculation algorithm is: 

> Traceability Level[TL] = ( IPTC * 1 + ATCC * 1 + DEC * 1 )/3



##### **Intrusion Path Traceability Capability[IPTC]**

Intrusion Path Traceability Capability mainly used for evaluate when The ability of the defender to trace the intrusion path of the intruder

- 0 - no intrusion path traceability
- 1 - Attack path restoration 0 - 25%
- 2 - Attack path restoration 25% - 50%
- 3 - Attack path restoration 50% - 80%
- 4 - Attack Path Recovery 80% - 100%

##### **Attacker Traceability and Countermeasure Capability[ATCC]**

Attacker Traceability and Countermeasure Capability mainly used for evaluate when The ability of the defender to trace the source to the attacker

- 0 - hardly any useful information can be traced back to the source
- 1 - Attacker's C2 server IP or springboard IP is traced
- 2 - Attackers commonly use virtual identities or real IPs in China to be traced
- 3 - Attacker's attack asset or computer is reversely controlled
- 4 - The real identity information of the attacker is traced to the source

##### **Deception and Entrapment Capabilities[DEC]**

Deception and Entrapment Capabilities mainly used for evaluate when Enterprise honeypot honeynet construction, and the ability to deceive and trap attackers

- 0 - no deception trapping ability
- 1 - Build a high-fidelity honeypot in the network
- 2 - A highly simulated honeynet is built in the network, which can introduce attackers into the honeynet
- 3 - Dynamic honeynet capability, which can direct all attacker traffic into the honeynet from the production environment
- 4 - It has perfect secret spraying, honey tagging and honey application customization, honey farm management capabilities, and can realize active attraction, dynamic adaptation and anti-trapping capabilities



## **Vector String**

With reference to the CVSS scoring framework, RTASS also uses "vector strings" to record the scoring process and to transmit RTASS indicator information. The RTASS vector string starts with the label "RTASS:" and the digital representation of the current version (for example 1.0.0). The indicator information appears in the form of a set of indicators, each indicator is preceded by a forward slash "/" as a separator. Each indicator is composed of an abbreviated indicator name, colon, and indicator value. The abbreviations are defined earlier in this specification (in parentheses after each factor name) and are summarized in the table below.

### **Factor**

| Factor Name                          | Possible Value |
| ------------------------------------ | -------------- |
| Offensive Level[OL]                  | 0-4            |
| Offensive Difficulty[OD]             | 0-4            |
| Target Reach[TR]                     | 0-4            |
| Anti-traceability Level[AL]          | 0-4            |
| Prevention Level[PL]                 | 0-4            |
| Detection Level[DL]                  | 0-4            |
| Response Level[RL]                   | 0-4            |
| Traceability Level[TL]               | 0-4            |
| Vulnerability Discoverability[VD]    | 0-4            |
| Vulnerability Exploitability[VE]     | 0-4            |
| Vulnerability Lethality[VL]          | 0-4            |
| Vulnerability Disclosure Window[VDW] | 0-4            |
| Loss of Confidentiality[LC]          | 0-4            |
| Loss of Integrity[LI]                | 0-4            |
| Loss of Availability[LA]             | 0-4            |
| Financial Damage[FD]                 | 0-4            |
| Reputation Damage[RD]                | 0-4            |
| Compliance Impact[CI]                | 0-4            |
| Development Life Circle[DLC]         | 0-4            |
| Operation Life Circle[OLC]           | 0-4            |
| Employment Security Awareness[ESA]   | 0-4            |

### **Ability**

> Note: In the RTASS Base scoring mode, the ability factor is not required; in the RTASS Plus scoring mode, the ability factor is required.

| Ability Name                                              | Possible Value |
| --------------------------------------------------------- | -------------- |
| Intelligence Reconnaissance Capability[IRC]               | 0-4            |
| Weaponization Capability[WC]                              | 0-4            |
| Vulnerability Mining and Exploitation Capability[VMEC]    | 0-4            |
| Anti Threat Detection Capability[ATDC]                    | 0-4            |
| Social Engineering Capability[SEC]                        | 0-4            |
| Permission Persistence Capability[PPC]                    | 0-4            |
| Tunnel Construction Capability[TCC]                       | 0-4            |
| Lateral Movement Capability[LMC]                          | 0-4            |
| Goal Achievement Time[GAT]                                | 0-4            |
| Goal Achievement Cost[GAC]                                | 0-4            |
| Goal Action Ability[GAA]                                  | 0-4            |
| Information Event Management Capability[IEMC]             | 0-4            |
| Software Update Management Capability[SUMC]               | 0-4            |
| Threat Identification Blocking Capability[TIBC]           | 0-4            |
| Baseline Security Management Capabilities[BSMC]           | 0-4            |
| Account Security Management Capabilities[ASMC]            | 0-4            |
| Privilege Security Management Capability[PSMC]            | 0-4            |
| Network Access Control Capability[NACC]                   | 0-4            |
| External Threat Traffic Awareness[ETTA]                   | 0-4            |
| External Harpoon Attack Awareness[EHAA]                   | 0-4            |
| Proximity Penetration Attack Awareness[PPAA]              | 0-4            |
| Intranet Threat Traffic Awareness[ITTA]                   | 0-4            |
| Endpoint Malware Awareness[EMA]                           | 0-4            |
| Endpoint Abnormal Behavior Awareness[EABA]                | 0-4            |
| Threat Detection Rate[TDR]                                | 0-4            |
| Threat Identification Timeliness Rate[TITR]               | 0-4            |
| Threat Handling Capability[THC]                           | 0-4            |
| Threat Disposal Timely Rate[TDTR]                         | 0-4            |
| Threat Analysis Capability[TAC]                           | 0-4            |
| Intrusion Path Traceability Capability[IPTC]              | 0-4            |
| Attacker Traceability and Countermeasure Capability[ATCC] | 0-4            |
| Deception and Entrapment Capabilities[DEC]                | 0-4            |

RTASS Base Mode ector string Example:
RTASS:0.3.2/OL:4/OD:0/TR:4/AL:3/PL:1/DL:4/RL:4/TL:1/VD:3/VE:2/VL:4/VDW:4/LC:0/LI:2/LA:2/FD:2/RD:3/CI:1/DLC:2/OLC:2/ESA:3

RTASS Plus Mode ector string Example:
RTASS:0.3.2/OL:1/OD:4/TR:0/AL:3/PL:1/DL:2/RL:4/TL:3/VD:4/VE:4/VL:4/VDW:2/LC:4/LI:1/LA:3/FD:4/RD:1/CI:2/DLC:1/OLC:3/ESA:2/IRC:2/WC:1/VMEC:0/ATDC:1/SEC:1/PPC:2/TCC:1/LMC:0/GAT:3/GAC:2/GAA:4/IEMC:2/SUMC:1/TIBC:3/BSMC:0/ASMC:1/PSMC:0/NACC:0/ETTA:1/EHAA:4/PPAA:0/ITTA:0/EMA:4/EABA:0/TDR:0/TITR:2/THC:0/TDTR:1/TAC:3/IPTC:1/ATCC:0/DEC:4

The vector string should contain all the indicators shown in the table above, accepting any order of measurement. If the vector string contains the same metric multiple times, the last metric shall prevail.

## **One Thing About RTASS**

In the RTASS framework, the process score is calculated through the basic factors, and then the final score is calculated through the process score. The algorithm reserves space for future expansion, but in the case of insufficient data at this stage, the modulus of the factor is basically 1.

In solving this problem, CVSS adopted the method of manually constructing a set of lookup tables corresponding to the severity of real vulnerabilities through the CVSS Special Interest Group (SIG), and then adjusting the parameters in turn. Finally, it is ensured that the deviation between the manual evaluation vulnerability score and the CVSS framework evaluation score is less than 0.5.

Due to the difference between red and blue confrontation exercises and vulnerability, it is currently impossible to adjust parameters through a large number of ready-made samples. However, we will continue to collect new samples, through manual evaluation and reference to updated methodology, to make the RTASS score more accurate. This also requires more participation and strong support from you who read this specification.

## **Collaborate And Contribute**

This framework uses JSON format for system description, see "/src/RTASS.json" file for details, where:

- The ability score is placed in the "abilities" object, including Chinese and English from 0 to 4 for each factor Score description. 
- Scoring factors are placed in the "factors" object, including a description of each factor's scores in Chinese and English from 0 to 4. 
- Process scores are described by "processScores", where "algorithm" is the scoring algorithm. 
- Final scores are described by "finalScores", where "algorithm" is the scoring algorithm. 
- The "levels" object stores the correspondence between the scores and the extremes, highs, mediums, and lows. 
- The "factorGroups" object stores the corresponding relationship between the two groups of offensive and defensive factors and business factors and the process score. 

Collaborators can cooperate with us to develop the system framework by modifying the description of each scoring factor and scoring algorithm in the RTASS.json file.

### **Thanks**

- Thanks to devils for his contribution to the competency evaluation model.
- Thanks to makato for the comments on each rating item.
- Thanks to vf3ng for metrics and comments on the accuracy of the framework evaluation.

## **References**

- https://owasp.org/www-community/OWASP_Risk_Rating_Methodology, OWASP, OWASP Risk Rating Methodology
- https://www.first.org/cvss/v3.1/specification-document, FIRST CVSSv3, CVSSv3.1 Specification Document
- https://en.wikipedia.org/wiki/Common_Vulnerability_Scoring_System, Wikipedia, Common Vulnerability Scoring System

## **RTASS Online Calculator**

![calculator-cn](./docs/img/calculator-cn.jpg)

Online Calculator: <https://rtass.jd.army>

  