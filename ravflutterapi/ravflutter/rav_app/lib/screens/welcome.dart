import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({Key? key}) : super(key: key);

  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        decoration: const BoxDecoration(
          color: Colors.white,
        ),
        child: Stack(
          children: [
            Positioned.fill(
              child: Align(
                alignment: Alignment.bottomLeft,
                child: Container(
                  width: MediaQuery.of(context).size.width,
                  height: 517.50,
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(250),
                    ),
                    color: Color(0xFF0025B8),
                  ),
                  padding: const EdgeInsets.only(
                    left: 61,
                    right: 54,
                    top: 100,
                    bottom: 70,
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Image.asset('assets/svg/logo.png', 
                        width: 50.0,
                        height: 50.0,
                        fit: BoxFit.cover,
                      ),
                      const Text(
                        "Let`s connect you to the",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                        ),
                      ),
                      const Text(
                        "Best Mentors.",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 30,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const Text(
                        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 15,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ElevatedButton(
                          child: const Text('GET STARTED',
                              style:
                                  TextStyle(fontSize: 20, color: Colors.black)),
                          onPressed: () {
                            
                          },
                          style: ButtonStyle(
                              backgroundColor:
                                  MaterialStateProperty.all(Colors.white)),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Positioned(
              left: 67,
              top: 97,
              child: Container(
                width: 226,
                height: 226,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: Color(0x0A373644),
                ),
              ),
            ),
            Positioned(
              left: 50,
              top: 80,
              child: Container(
                width: 260,
                height: 260,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: Color(0x07000000),
                ),
              ),
            ),
            Positioned(
              left: 84,
              top: 114,
              child: Container(
                  width: 191,
                  height: 191,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: SvgPicture.asset(
                      'assets/svg/undraw_conversation_re_c26v.svg')),
            ),
          ],
        ),
      ),
    );
  }
}
